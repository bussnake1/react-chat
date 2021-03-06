import {React, useRef} from 'react'

export default function ChatInputRow({ submitCallback }) {
  const inputEl = useRef(null);
  function submit (e) {
    e.preventDefault()
    e.stopPropagation()
    submitCallback(inputEl.current.value)
    // console.log(inputEl.current.value)
    inputEl.current.value = ''
  }
  return (
    <form className="ChatInputRow" onSubmit={submit}>
      <input ref={inputEl} type="text" className="ChatInput"></input>
      <button className="SendButton">
        
      </button>
    </form>
  )
}
