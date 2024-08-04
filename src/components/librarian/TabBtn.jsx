import React from 'react'
import '../../css/librarian/TabBtn.css'

const TabBtn = ({label, active, onClick}) => {
  return (
    <span
      className={`tab-btn ${active ? 'active' : ''}`} 
      onClick={onClick}
    >
      {label}
    </span>
  )
}

export default TabBtn;