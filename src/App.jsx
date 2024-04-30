import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const [data, setData] = useState([])
  const [input,setInput] = useState("")

  const getItem = async() =>{
    let res = await axios.get("https://northwind.vercel.app/api/categories")
     setData(res.data)
    
  }
 
  const createItem = async(e) =>{
    e.preventDefault()

    let obj = {name: input}
    let res = await axios.post("https://northwind.vercel.app/api/categories",obj)
    setData([...data,res.data])
    setInput("")
 
  }
  const delItem = async(id) =>{

    await axios.delete(`https://northwind.vercel.app/api/categories/${id}`)
 
    let arr = data.filter(item=>item.id!=id)
    setData(arr)
 
  }
  const editItem = async(id) =>{
    let edit = prompt("Edit")
    let newObj = {name:edit}
    await axios.patch(`https://northwind.vercel.app/api/categories/${id}`,newObj)
    setData([...data, newObj])
  }

  useEffect(()=>{
    getItem()
    
  },[])


  return (
    <>
      <div className="container">
      <div className="addTask">
        <form>
          <input id="input" type="text" placeholder="Add your task" value={input} onChange={(e)=>setInput(e.target.value)} />
          <button id="add" className="btn" onClick={(e)=>createItem(e)}>Add Task</button>
        </form>
      </div>
      <div className="taskList">
        <ul>
        
          {data.map((elem)=>{
        
            return <li key={elem.id}>
            <span>{elem.name}</span>
            <button id="delete" className="btn" onClick={()=>delItem(elem.id)} >Delete Task</button>
            <button id="edit" className="btn" onClick={()=> editItem(elem.id)} >Edit Task</button>

          </li>
          })}
        
           
        </ul>
      </div>
    </div>
    
  
    </>
  )
}

export default App
