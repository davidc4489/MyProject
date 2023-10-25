import {getAll, add, update, remove} from "./baseServer.js";

export const getUsers = async (req, res) => {
    let usersData = [] 
    await getAll("users").then(data => usersData = data)
     return res.send(usersData)
}

export const addUser = (req, res) => {
    let newData = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "permission": req.body.permission
    }
    console.log(newData)
    if (req.body.name && req.body.email && req.body.password && req.body.permission){
        add('users', newData)};
    res.send({ message: 'Data added ' });
}

export const updateUser= (req,res) => {
    let newData = {id:req.params.id}
    if (req.body.name){ newData.name = req.body.name}
    if (req.body.email){ newData.email = req.body.email}
    if (req.body.password){ newData.password = req.body.password}
    if (req.body.permission){ newData.permission = req.body.permission}
    
    if (req.body.name && req.body.email && req.body.password && req.body.permission){
        update('users',newData)}
    res.send({ message: 'Data for USERS ${id} updated successfully' });
}

export const removeUser = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('users',id);
      res.status(200).send("User deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };