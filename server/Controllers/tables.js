import {getAll, add, update, remove, } from "./baseServer.js";

export const getTables = async (req, res) => {
    let tableData = [] 
    await getAll("TABLES").then(data => tableData = data)
     return res.send(tableData)
}

export const addTable = (req, res) => {
    let newData = {
        "name": req.body.name,
        "capacity": req.body.capacity,
        "description": req.body.description,
        "status": true,
        "customers": null,
    }
    console.log(newData)
    if (req.body.name && req.body.capacity){
        add('tables', newData)};
    res.send({ message: 'Data added ' });
}

export const updateTable = (req,res) => {
    let newData = {id:req.params.id}
    if (req.body.name){ newData.name = req.body.name}
    if (req.body.capacity){ newData.capacity = req.body.capacity}
    if (req.body.description){ newData.description = req.body.description}
    // If there is a customer at the table, the table status is occupied
    req.body.customers !== '' ? (newData.status = false) : (newData.status = true)
    if (req.body.customers !== undefined ){ newData.customers = req.body.customers}
    req.body.status == false ? (newData.status = false) : (newData.status = true)
    
    if (req.body.name && req.body.capacity){
        update('TABLES',newData)}
    res.send({ message: 'Data for ALLTABLE ${id} updated successfully' });
}

export const removeTable = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('TABLES',id);
      res.status(200).send("Course deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };
