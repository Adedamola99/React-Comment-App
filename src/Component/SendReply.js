import React from 'react';

const SendReply = (props) => {
  const { handleSubmit, text, submitLabel, handleChange } = props;
  const isTextAreaDisabled = text.length === 0;

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   handleSubmit(text)
  //   setText("")
  // }

  return (
    <form  className="reply">
      <img className='avatar' src='images/avatars/image-juliusomo.png' alt="" />
      <textarea
            className='text-area'
            placeholder='Add Comment...'
            value={text}
            onChange={handleChange}
      />
      <button 
        className='send' 
        onClick={handleSubmit} 
        disabled={isTextAreaDisabled}
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default SendReply
