const express=require("express");
const cors=require("cors");
const bodyParser = require('body-parser')
// const { uuid } = require('uuidv4')


const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

let users=[
    {
        id:0,name:"Fatime",age:21
    },
    {
        id:1,name:"Amine",age:20
    }
]
let idCounter=2;

// app.get("/",(req,res)=>{
//     res.status(403)
//     res.send("hi")
// })
app.get("/users",(req,res)=>{
    res.json({
        success:true,
        quantity:users.length,
        data:users
    })
})

//! get user by id
app.get("/users/:id/:name?",(req,res)=>{
    const id=+req.params.id
    // console.log(req.params.id);
    const user=users.find((u)=>u.id===id)
    if(!user){
        return res.json({
            success:false
        })
    }
  res.json({
    success:true,
    data:user,
  })
})
//! add user
app.post("/users",(req,res)=>{
    const newUser={...req.body,id:idCounter++}
    users=[...users,newUser]
    res.json({
        success:true,
        data:users,
    })
})
// app.post("/users", (req, res) => {
//     const id = uuid();
  
//     const newUser = { ...req.body, id: id };
//     users = [...users, newUser];
  
//     res.json({
//       success: true,
//       data: users,
//     });
//   });
//! delete user
app.delete("/users/:id",(req,res)=>{
    const id=req.params.id;
    users=users.filter((u)=>u.id !=id);

    res.json({
        success: true,
        data: users,
      });
})
// update user
app.put("/users/:id", (req, res) => {
    const id = +req.params.id;
  
    users = users.filter((u) => u.id !== id);
  
    const updatedUser = {
      id: +req.params.id,
      name: req.body.name,
      age: req.body.age,
    };
  
    users.push(updatedUser);
    res.json({
      success: true,
    });
  });
const PORT=8080;
app.listen(PORT,()=>{
    console.log("Server is up and running");
});