import { LightBulbIcon, SearchIcon } from '@primer/octicons-react'
import { useState } from 'preact/hooks'
import { TriggerMode } from '../config'
import ChatGPTQuery, { QueryStatus } from './ChatGPTQuery'
import { endsWithQuestionMark } from './utils.js'

interface Props {
  question: string
  webResults: string
  triggerMode: TriggerMode
  // eslint-disable-next-line no-unused-vars
  onStatusChange?: (status: QueryStatus) => void
  lang: string
}

function ChatGPTCard(props: Props) {
  const [triggered, setTriggered] = useState(false)

  if (props.triggerMode === TriggerMode.Always) {
    return (
      <ChatGPTQuery
        lang={props.lang}
        question={props.question}
        onStatusChange={props.onStatusChange}
        webResults={props.webResults}
      />
    )
  }
  if (props.triggerMode === TriggerMode.QuestionMark) {
    if (endsWithQuestionMark(props.question.trim())) {
      return (
        <ChatGPTQuery
          lang={props.lang}
          question={props.question}
          onStatusChange={props.onStatusChange}
          webResults={props.webResults}
        />
      )
    }

    return (
      <p className="icon-and-text">
        <LightBulbIcon size="small" /> Trigger ChatGPT by appending a question mark after your query
      </p>
    )
  }
  if (triggered) {
    return (
      <ChatGPTQuery
        lang={props.lang}
        question={props.question}
        onStatusChange={props.onStatusChange}
        webResults={props.webResults}
      />
    )
  }
  return (
    <p className="icon-and-text cursor-pointer" onClick={() => setTriggered(true)}>
      <SearchIcon size="small" /> Ask ChatGPT for this query
    </p>
  )
}

export default ChatGPTCard
