import {React, useRef} from 'react'

export default function ChatInputRow(props) {
  const inputEl = useRef(null);
  function submit (e) {
    e.preventDefault()
    e.stopPropagation()
    props.submitCallback(inputEl.current.value)
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
