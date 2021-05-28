import {React, useRef, useEffect} from 'react'
import ChatMessage from './ChatMessage'

export default function ChatBody({ messages: messagesUnsorted, ownId }) {
  const messageCount = messagesUnsorted.length

  const scrollDiv = useRef(null)
  const chatBodyEl = useRef(null)

  const messages = messagesUnsorted.sort((a, b) => a.epoch - b.epoch)
  const messageItems = messages.map((message, i) =>
    // check if messages above and below each message belong to the same user or not
    <ChatMessage message={message} ownId={ownId} above={messages[i - 1]?.userId === message.userId} below={messages[i + 1]?.userId === message.userId} key={i}/>
  )
  useEffect((messageCount) => {
    chatBodyEl.current.scrollTo(0, scrollDiv.current.offsetTop)
  }, [messageCount])
  return (
    <div ref={chatBodyEl} className="ChatBody">
      {messageItems}
      <div ref={scrollDiv}>
      </div>
    </div>
  )
}
