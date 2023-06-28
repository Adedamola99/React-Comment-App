import React, { useState, useEffect } from "react";
import Comment from "./Component/Comment";
import SendCommentReply from "./Component/SendCommentReply"
import SendReply from "./Component/SendReply";
import ReplyFormat from "./Component/ReplyFormat";
import data from "./data.json"
import { nanoid } from 'nanoid';

function App() { 
  const [text, setText] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [activeComment, setActiveComment] = useState(null);

  const [allData, setAllData] = useState(
    () => JSON.parse(localStorage.getItem("comments")) || []
  );
    
  const [sendData, setSendData] = useState(
    () => JSON.parse(localStorage.getItem("sendData")) || []
  );

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(allData))
  }, [allData])

  useEffect(() => {
    localStorage.setItem('sendData', JSON.stringify(sendData))
  }, [sendData])


  useEffect(() => {
    setAllData(data.comments)
  }, [])

  const addReply = (commentId, replyContent) => {
    const newReply = {
      id: nanoid(),
      replyingTo: "replyTo",
      content: replyContent,
      createdAt: new Date().toLocaleString(),
      score: 0,
      user: {
        image: { 
          png: "./images/avatars/image-juliusomo.png",
        },
      }
    }

    setAllData(prevComment => {
      return prevComment.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: 
            [
              ...comment.replies, newReply ]
          };
        }
        return comment;
      })
    })
    setActiveComment(false)
    
  }
  

  const addComment = () => {
    setSendData(prev => {
      return[
        ...prev,
         {
          id: nanoid(),
          content: text,
          createdAt: new Date().toLocaleString(),
          score: 0,
          user: {
            image: { 
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp"
            },
            username: "juliusomo"
          },
          replies: []
        }
      ]
    })
  }

  const deleteComment = (data,id) => {
    data(prevData => prevData.filter(item => item.id !== id));
  }

  
  const itemData = allData.map(data => {
    return (
      <div className="container" key = {data.id}>
        <Comment
          id = {data.id}
          name = {data.user.username}
          date = {data.createdAt}
          content = {data.content}
          image = {data.user.image.png}
          score = {data.score}
          replyData = {data.replies}
          setActiveComment = {setActiveComment}
        />

      {activeComment && activeComment.id === data.id && (
        <SendCommentReply 
          id = {data.id}
          replyTo = {data.user.username}
          onReply = {addReply}
          replyContent = {replyContent}
          setReplyContent = {setReplyContent}
        />
      )}
      </div>
    )

  })

  return (
    <div className='box'>
      {itemData}

      {sendData.length > 0 && sendData.map((data, index) => {
        return (
          <ReplyFormat 
            key = {index}
            id = {data.id} 
            name = {data.user.username}
            date = {data.createdAt}
            text = {data.content}
            image = {data.user.image.png}
            score = {data.score}
            deleteComment = {deleteComment}
            sendData = {sendData}
            setSendData = {setSendData}
          /> 
        )
      })}

      <SendReply 
        handleSubmit= {addComment}
        text = {text}
        setText = {setText}
        submitLabel = "SEND"
      />
    </div>
  );
}


export default App;
