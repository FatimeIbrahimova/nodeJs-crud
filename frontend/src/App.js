import axios from "axios"
import './App.css';
import React, { useEffect, useState } from 'react'

function App() {
  const [users,setUsers]=useState([])
  const [state,setState]=useState({
    name:"",age:undefined
  })
  const handleChange=(e)=>{
    setState({...state,[e.target.name]:e.target.value})
  }

  const getData=async()=>{
    const res=await axios.get("http://localhost:8080/users")
    setUsers(res.data.data)
  }
  useEffect(()=>{
    getData()
  },[])
  console.log(users);

  const addData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/users", state);
    getData();
  };
  const deleteData = (id) => {
    console.log(id);
    axios.delete(`http://localhost:8080/users/${id}`);
    getData();
  };
  return (
    <div>
      <form onSubmit={(e)=>addData(e)}>
        <input onChange={(e)=>handleChange(e)} type="text" placeholder="name" name="name"/>
        <input onChange={(e)=>handleChange(e)} type="text" placeholder="age" name="age"/>
        <button>add</button>
      </form>
      {users && users.map((user)=>{
        return <li key={user.id}>
          <span>{user.name}</span>
          <span>{user.age}</span>
          <button onClick={()=>deleteData(user.id)}>delete</button>
        </li>
      })}
    </div>
  );
}

export default App;
