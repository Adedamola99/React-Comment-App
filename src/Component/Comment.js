import React from 'react'

const Comment = (props) => {
  const { image, name, date, content, replyData, setIsReplying, id } = props;

  const handleReply = (id) => {
    setIsReplying(true)
    console.log("pressed");
  }


  const UserReply = replyData.map(replies => {

    const showReplyType = replies.user.username !== "juliusomo" ? (
      <div className="top-content">
        <div className="inner-content">
          <img className="avatar"  src= {replies.user.image.png} alt=""/>
            <p className="name">{replies.user.username}</p>
            <p className="date">{replies.createdAt}</p>
        </div>

        <div className="reply-box">
          <img src="./images/icon-reply.svg" alt=""/>
          <p className="reply-text">Reply</p>
        </div>
      </div>

    ) : (
      <div className="top-content">
        <div className="inner-content">
          <img className="avatar"  src= {replies.user.image.png} alt=""/>
            <p className="name">{replies.user.username}</p>
            <p className='you-text'>you</p>
            <p className="date">{replies.createdAt}</p>
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
      <div className='comment-replies' key={replies.id}>
        <div className="count">
            <button className= "add-icon" ><img src="./images/icon-plus.svg" alt="add-icon"/></button>
            <p className="count-number">{replies.score}</p>
            <button className = "minus-icon" ><img src="./images/icon-minus.svg" alt="minus-icon"/></button>
        </div>

        <div className='content'>
          {showReplyType}
          <span className="content-word"><span className='reply-To'>@{replies.replyingTo}</span> {replies.content}</span>
        </div>
      </div>
    )
  })


  return (
    <>
      <div className="comment" key={id}>
        <div className="count">
          <button className= "add-icon" ><img src="./images/icon-plus.svg" alt="add-icon"/></button>
          <p className="count-number">0</p>
          <button className = "minus-icon" ><img src="./images/icon-minus.svg" alt="minus-icon"/></button>
        </div>

        <div className="content">
          <div className="top-content">
            <div className="inner-content">
              <img className="avatar"  src= {image} alt=""/>
              <p className="name">{name}</p>
              <p className="date">{date}</p>
            </div>

            <div className="reply-box">
              <img src="./images/icon-reply.svg" alt=""/>
              <p className="reply-text" onClick={() => handleReply(id)}>Reply</p>
            </div>
          </div> 
                   
          <span className="content-word">{content}</span>
        </div>
      </div>

      <div className="comment-replies-box">
        {UserReply}
      </div>

    </>
  )
}

export default Comment

