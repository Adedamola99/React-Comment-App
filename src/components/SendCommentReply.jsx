import React from 'react';

const SendReply = (props) => {
  const { replyContent, setReplyContent, onReply, id, replyTo } = props;
  const isTextAreaDisabled = replyContent.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim() !== "") {
      const replyingTo = replyTo
      onReply(id, replyContent, replyingTo)
      setReplyContent("");
    }
  }

  return (
    <form onSubmit={onSubmit} className="reply">
      <img className='avatar' src='images/avatars/image-juliusomo.png' alt="" />
      <textarea
            className='text-area'
            placeholder={`Reply To ${replyTo}`}
            value= {replyContent}
            onChange={e => setReplyContent(e.target.value)}
            
      />
      <button 
        className='send'
        disabled={isTextAreaDisabled}
      >
        REPLY
      </button>
    </form>
  )
}

export default SendReply
