import React, { useState, useEffect } from "react";
import Comment from "./components/Comment";
import SendCommentReply from "./components/SendCommentReply";
import SendReply from "./components/SendReply";
import ReplyFormat from "./components/ReplyFormat";
import data from "./data.json";
import { nanoid } from "nanoid";

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

  // Track user votes for each comment/reply
  const [userVotes, setUserVotes] = useState(
    () => JSON.parse(localStorage.getItem("userVotes")) || {}
  );

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(allData));
  }, [allData]);

  useEffect(() => {
    localStorage.setItem("sendData", JSON.stringify(sendData));
  }, [sendData]);

  useEffect(() => {
    localStorage.setItem("userVotes", JSON.stringify(userVotes));
  }, [userVotes]);

  useEffect(() => {
    setAllData(data.comments);
  }, []);

  // Voting functionality
  const handleVote = (commentId, replyId, voteType) => {
    const voteKey = replyId ? `${commentId}-${replyId}` : commentId;
    const currentVote = userVotes[voteKey];

    // If user already voted this way, do nothing (ignore multiple clicks)
    if (currentVote === voteType) {
      return;
    }

    let newVote = null;
    let scoreChange = 0;

    if (!currentVote) {
      // First time voting
      newVote = voteType;
      scoreChange = voteType === "up" ? 1 : -1;
    } else {
      // User had opposite vote, change it
      newVote = voteType;
      scoreChange = voteType === "up" ? 2 : -2; // Remove old vote and add new vote
    }

    setUserVotes((prev) => ({
      ...prev,
      [voteKey]: newVote,
    }));

    if (replyId) {
      // Update reply score
      setAllData((prevData) =>
        prevData.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === replyId
                    ? { ...reply, score: reply.score + scoreChange }
                    : reply
                ),
              }
            : comment
        )
      );
    } else {
      // Update comment score in allData
      setAllData((prevData) =>
        prevData.map((comment) =>
          comment.id === commentId
            ? { ...comment, score: comment.score + scoreChange }
            : comment
        )
      );

      // Update comment score in sendData
      setSendData((prevData) =>
        prevData.map((comment) =>
          comment.id === commentId
            ? { ...comment, score: comment.score + scoreChange }
            : comment
        )
      );
    }
  };

  // Edit reply functionality
  const updateReply = (commentId, replyId, newContent) => {
    setAllData((prevData) =>
      prevData.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, content: newContent } : reply
              ),
            }
          : comment
      )
    );
  };

  //ADD REPLIES TO COMMENTS
  const addReply = (commentId, replyContent, replyingTo) => {
    const newReply = {
      id: nanoid(),
      replyingTo: replyingTo,
      content: replyContent,
      createdAt: new Date().toLocaleString(),
      score: 0,
      user: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
        },
        username: "juliusomo",
      },
    };

    setAllData((prevComment) => {
      return prevComment.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });
    });

    setActiveComment(false);
  };

  //ADD NEW COMMENT
  const addComment = () => {
    setSendData((prev) => {
      return [
        ...prev,
        {
          id: nanoid(),
          content: text,
          createdAt: new Date().toLocaleString(),
          score: 0,
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
          replies: [],
        },
      ];
    });
  };

  // Delete Comment
  const deleteComment = (id) => {
    setSendData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // Delete ReplyComment
  const deleteReplyComment = (commentId, replyId) => {
    const updatedComment = [...allData].map((item) => {
      if (item.id === commentId) {
        item.replies = item.replies.filter((reply) => reply.id !== replyId);
      }
      return item;
    });

    setAllData(updatedComment);
  };

  const itemData = allData.map((data) => {
    return (
      <div className="container" key={data.id}>
        <Comment
          id={data.id}
          name={data.user.username}
          date={data.createdAt}
          content={data.content}
          image={data.user.image.png}
          score={data.score}
          replyData={data.replies}
          setActiveComment={setActiveComment}
          deleteReplyComment={deleteReplyComment}
          handleVote={handleVote}
          userVotes={userVotes}
          updateReply={updateReply}
        />

        {activeComment && activeComment.id === data.id && (
          <SendCommentReply
            id={data.id}
            replyTo={data.user.username}
            onReply={addReply}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
          />
        )}
      </div>
    );
  });

  return (
    <div className="box">
      {itemData}

      {sendData.length > 0 &&
        sendData.map((data) => {
          return (
            <ReplyFormat
              key={data.id}
              id={data.id}
              name={data.user.username}
              date={data.createdAt}
              text={data.content}
              image={data.user.image.png}
              score={data.score}
              sendData={sendData}
              setSendData={setSendData}
              deleteComment={deleteComment}
              handleVote={handleVote}
              userVotes={userVotes}
            />
          );
        })}

      <SendReply
        handleSubmit={addComment}
        text={text}
        setText={setText}
        submitLabel="SEND"
      />
    </div>
  );
}

export default App;
