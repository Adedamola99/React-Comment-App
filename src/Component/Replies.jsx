import React from 'react'

const Replies = (props) => {
  const { image, username, date, content, score, replyingTo, text, setText } = props;

  const showReplyType = username !== "juliusomo" ? (
    <div className="top-content">
      <div className="inner-content">
        <img className="avatar"  src= {image} alt=""/>
          <p className="name">{username}</p>
          <p className="date">{date}</p>
      </div>

      <div className="reply-box">
        <img src="./images/icon-reply.svg" alt=""/>
        <p className="reply-text">Reply</p>
      </div>
    </div>

  ) : (
    <div className="top-content">
      <div className="inner-content">
        <img className="avatar"  src= {image} alt=""/>
          <p className="name">{username}</p>
          <p className='you-text'>you</p>
          <p className="date">{date}</p>
      </div>

      <div className="action-container">
        <div className='action-box'>
          <img src="./images/icon-delete.svg" alt="" className='deleteIcon'/>
          <p className='delete-text'>Delete</p>
        </div>

        <div className='action-box'>
          <img src="./images/icon-edit.svg" alt="" />
          <p className='edit-text'>Edit</p>
        </div>
      </div>        
    </div>
  )

  return (
    <div className='comment-replies'>
      <div className="count">
          <button className= "add-icon" ><img src="./images/icon-plus.svg" alt="add-icon"/></button>
          <p className="count-number">{score}</p>
          <button className = "minus-icon" ><img src="./images/icon-minus.svg" alt="minus-icon"/></button>
      </div>

      <div className='content'>
        {showReplyType}
        <span className="content-word"><span className='reply-To'>@{replyingTo}</span> {content}</span>
      </div>
  </div>
  )
}

export default Replies
