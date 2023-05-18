import React from 'react'

const Update = (props) => {
    
    const { id, handleUpdate, handleChange, value } = props

  return (
    <div className='update-container'>
        <textarea className="text-area update" placeholder='Add a comment...' value={value} onChange={handleChange} />
        <button className='updateBtn' onClick={()=> handleUpdate(id)}>UPDATE</button>
    </div>
  )
}

export default Update
