import React, { useState } from 'react'
import Update from './Update';

const NewCommentFormat = (props) => {
  const { name, date, text, score, image, id, deleteComment, setSendData} = props;
  const [edit, setEdit] = useState(false);
  const [editcomment, setEditComment] = useState({value: text})

  const handleEditing = (id) => {
    setEdit(true);
  }

    const handleChange = (event)=>{
      setEditComment(prev => {
        return {
          ...prev,
          value: event.target.value
        }
      })
    }
  
    const handleUpdate = (id) =>{
      setSendData(prev => prev.map(item =>{
        return item.id === id ? {...item, content: editcomment.value} : item
        })
      )

      setEdit(false);    
    }

  const displayUpdate = edit && <Update id={id} value={editcomment.value} handleChange={handleChange} handleUpdate ={handleUpdate}/>

  return (
    <div className="commentform" key={id}>
      <div className="count">
        <button className= "add-icon" ><img src="./images/icon-plus.svg" alt="add-icon"/></button>
        <p className="count-number">{score}</p>
        <button className = "minus-icon" ><img src="./images/icon-minus.svg" alt="minus-icon"/></button>
      </div>

      <div className="commentform-content">  
        <div className="commentform-top-content">
          <div className="commentform-inner-content">
            <img className="avatar"  src= {image} alt=""/>
            <p className="name">{name}</p>
            <p className='you-text'>you</p>
            <p className="date">{date}</p>
          </div>

          <div className="action-container">
            <div className='action-box'>
              <img src="./images/icon-delete.svg" alt="" className='deleteIcon'/>
              <p className='delete-text' onClick={() => deleteComment(setSendData, id)}>Delete</p>
            </div>
    
            <div className='action-box'>
              <img src="./images/icon-edit.svg" alt="" />
              <p className='edit-text' onClick={() => handleEditing(id)}>Edit</p>
            </div>
          </div>
        
        </div>
      
        <span className="content-word">{edit ? displayUpdate : text}</span>
      </div>
    </div>
  )
}

export default NewCommentFormat
