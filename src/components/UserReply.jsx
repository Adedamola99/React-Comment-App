import React from 'react';

const UserReply = (props) => {
    const { replyImage, replyName, replyDate, replyTo, replyContent } = props;
    const [replyVote, setReplyVote] = React.useState(props.replyScore);


    const showReplyType = replyName !== "juliusomo" ? (
      <div className="top-content">
        <div className="inner-content">
          <img className="avatar"  src= {replyImage} alt=""/>
            <p className="name">{replyName}</p>
            <p className="date">{replyDate}</p>
        </div>

        <div className="reply-box">
          <img src="./images/icon-reply.svg" alt=""/>
          <p className="reply-text">Reply</p>
        </div>
      </div>
    ) : (
      <div className="top-content">
        <div className="inner-content">
          <img className="avatar"  src= {replyImage} alt=""/>
            <p className="name">{replyName}</p>
            <p className='you-text'>you</p>
            <p className="date">{replyDate}</p>
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
            <p className="count-number">{replyVote}</p>
            <button className = "minus-icon" ><img src="./images/icon-minus.svg" alt="minus-icon"/></button>
        </div>

        <div className="content">
          {showReplyType}
          <p className="content-word"><span className='reply-To'>@{replyTo}</span> {replyContent}</p>
        </div>
    </div>
  )
}

export default UserReply
