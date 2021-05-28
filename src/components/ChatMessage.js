import React from 'react'

export default function Chatbox({ message, ownId, below, above}) {
  // above, below props show if the messages above or below this message belong to the same user or not
  const own = message.userId === ownId
  let chatMessageClass = 'ChatMessage rounded-tl rounded-bl rounded-tr rounded-br'
  if (own) {
    chatMessageClass += ' chat-own m-l'
    if (above) {
      chatMessageClass = chatMessageClass.replace(' rounded-tr', '')
    }
    if (below) {
      chatMessageClass = chatMessageClass.replace(' rounded-br', '')
    }
  } else {
    chatMessageClass += ' chat-other m-r'
    if (above) {
      chatMessageClass = chatMessageClass.replace(' rounded-tl', '')
    }
    if (below) {
      chatMessageClass = chatMessageClass.replace(' rounded-bl', '')
    }
  }

  return (
    <div className={`ChatMessageRow ${own ? 'cm-r' : 'cm-l'}`}>
      <div
        className={chatMessageClass}>{message.message}</div>
    </div>
  )
}
