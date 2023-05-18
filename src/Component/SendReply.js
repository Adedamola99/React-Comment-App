import React from 'react';

const SendReply = (props) => {
  const { handleSubmit, text, setText } = props;
  const isTextAreaDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text)
    setText("")
  }

  return (
    <form onSubmit={onSubmit} className="reply">
      <img className='avatar' src='images/avatars/image-juliusomo.png' alt="" />
      <textarea
            className='text-area'
            placeholder='Add Comment...'
            value={text}
            onChange={e => setText(e.target.value)}
      />
      <button className='send' disabled={isTextAreaDisabled}>SEND</button>
    </form>
  )
}

export default SendReply
