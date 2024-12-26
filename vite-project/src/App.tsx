import { useEffect, useState } from 'react'


function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latest ,setlatest ]=useState("")
  const [input,setintput]=useState("")

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => {
      console.log('Message received:', message.data);
      setlatest(message.data)
    } 
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <> 
    <input onChange={(e)=>{
      setintput(e.target.value)
    }}></input>
    <button onClick={()=>{
      socket.send(input)
    }}></button> 
    {latest}
     
    </>
  )
}

export default App