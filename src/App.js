import React, { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'


const App = () => {
  const [msg, setMsg] = useState('')
  const [db, setDb] = useState([])
  const socket = useRef(null)

  useEffect(()=>{
    socket.current = io.connect('http://localhost:5000')

    socket.current.on('message', db=>setDb(db))

  }, [])


  const handleClick = ()=>{
    socket.current.emit('message', msg)
  }

  return(
    <div style={{
      textAlign: 'center',
      fontSize: '2rem'
    }}>
      <input style={{
        borderRadius: '6px',
        width: '80vw',
        height: '10vh',
        marginBottom: '30px',
        border: '1px solid #ddd'
      }} value={msg} onChange={ev=>setMsg(ev.target.value)} type="text"/> <br/>
      <button style={{
        padding: '8px 16px',
        borderRadius: '6px',
        background: 'hotpink',
        color: 'white',
        border: 'none',
        fontSize: '24px'
      }} onClick={handleClick}>发消息</button>
      <ul style={{
        listStyleType: 'none',
        padding: 0
      }}>
        {db.map((item, index)=><li key={index}>{item}</li>)}
      </ul>
    </div>
  )
}

export default App