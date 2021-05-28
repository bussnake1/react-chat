import {React, useState, useEffect, useRef} from 'react'
import io from "socket.io-client"

import ChatHead from './ChatHead'
import ChatBody from './ChatBody'
import ChatInputRow from './ChatInputRow'

export default function Chatbox() {
  const mock = [
    {
      message: 'Hello',
      userId: 0,
      epoch: 1621947622678,
    },
    {
      message: 'Szeva',
      userId: 1,
      epoch: 1621947622679,
    },
    {
      message: 'Mizu?',
      userId: 1,
      epoch: 1621947622688,
    },
    {
      message: 'Ma semmi nem volt nálam, nálad?',
      userId: 0,
      epoch: 1621947623678,
    },
    {
      message: 'Itt se sok',
      userId: 1,
      epoch: 1621947722678,
    }
  ]

  const [messages, setMessages] = useState([])
  const ownId = useRef('')
  const socket = useRef(io("ws://localhost:8080"))

  useEffect(function () {
    // didmount
    socket.current.on('connected', function (data, callback) {
      // otherwise save ida
      console.log(data)
      if (!ownId.current) {
        console.log(ownId.current)
        ownId.current = data.id
      }
      callback({id: ownId.current})
    })
    socket.current.on('chat message', function(msg) {
      if (msg.message) {
        setMessages(messages => [...messages, {
          message: msg.message,
          userId: msg.userId,
          epoch: Date.now()
        }])
      }
    });

    return function () {
      // cleanup
    }
  }, [])



  function submit (text) {
    if (!text) return
    socket.current.emit('chat message', {
      message: text,
      userId: ownId.current,
      epoch: Date.now()
    })
    // setMessages(messages => [...messages, {
    //   message: text,
    //   userId: ownId,
    //   epoch: Date.now()
    // }]);
  }

  
  return (
    <div className="ChatBox">
      <ChatHead name="Chatroom"/>
      <ChatBody messages={messages} ownId={ownId.current}/>
      <ChatInputRow submitCallback={submit}/>
    </div>
  )
}
