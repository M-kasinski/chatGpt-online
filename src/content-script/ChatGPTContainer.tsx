import { TriggerMode } from '../config'
import ChatGPTCard from './ChatGPTCard'

interface Props {
  question: string
  triggerMode: TriggerMode
  webResults: string
  /*domains: []*/
}

function ChatGPTContainer(props: Props) {
  /*/!**!/const { domains } = props*/
  return (
    <div className="chat-gpt-card">
      <ChatGPTCard
        question={props.question}
        triggerMode={props.triggerMode}
        webResults={props.webResults}
      />
      {/*<div className="box-links">
        {domains &&
          domains.map((res, key) => (
            <a className="linksOnline" href={res} key={key}>
              {res}
            </a>
          ))}
      </div>*/}
    </div>
  )
}

export default ChatGPTContainer
