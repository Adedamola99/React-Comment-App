import React, { useState, useEffect } from "react";
import Comment from "./Component/Comment";
import SendReply from "./Component/SendReply";
import ReplyFormat from "./Component/ReplyFormat";
import data from "./data.json"
import { nanoid } from 'nanoid';

function App() { 
  const [allData, setAllData] = useState([]);
  const [text, setText] = useState("");
  const [sendData, setSendData] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  useEffect(() => {
    setAllData(data.comments)
  }, [])

  const handleReplyComment = (commentId) => {
    setAllData(prevComment => {
      return prevComment.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: 
            [
              ...comment.replies, 
              {
                id: nanoid(),
                content: text,
                createdAt: new Date().toLocaleString(),
                score: 0,
                user: {
                  image: { 
                    png: "./images/avatars/image-juliusomo.png",
                  },
                }
              }
            ]
          };
        }
        return comment;
      })
    })

  }
  

  const addComment = (text) => {
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
        <SendReply 
          handleSubmit= {handleReplyComment}
          text = {text}
          setText= {setText}
          submitLabel = "REPLY"
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
        setText= {setText}
        submitLabel = "SEND"
      />
    </div>
  );
}


export default App;
