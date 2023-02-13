import { TriggerMode } from '../config'
import ChatGPTCard from './ChatGPTCard'

interface Props {
  question: string
  triggerMode: TriggerMode
}

function ChatGPTContainer(props: Props) {
  return (
    <div className="chat-gpt-card">
      <ChatGPTCard question={props.question} triggerMode={props.triggerMode} />
    </div>
  )
}

export default ChatGPTContainer
