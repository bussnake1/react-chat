import React from 'react'

export default function Chatbox(props) {
  // above, below props show if the messages above or below this message belong to the same user or not
  const own = props.message.userId === props.ownId
  let chatMessageClass = 'ChatMessage rounded-tl rounded-bl rounded-tr rounded-br'
  if (own) {
    chatMessageClass += ' chat-own m-l'
    if (props.above) {
      chatMessageClass = chatMessageClass.replace(' rounded-tr', '')
    }
    if (props.below) {
      chatMessageClass = chatMessageClass.replace(' rounded-br', '')
    }
  } else {
    chatMessageClass += ' chat-other m-r'
    if (props.above) {
      chatMessageClass = chatMessageClass.replace(' rounded-tl', '')
    }
    if (props.below) {
      chatMessageClass = chatMessageClass.replace(' rounded-bl', '')
    }
  }

  return (
    <div className={`ChatMessageRow ${own ? 'cm-r' : 'cm-l'}`}>
      <div
        className={chatMessageClass}>{props.message.message}</div>
    </div>
  )
}
