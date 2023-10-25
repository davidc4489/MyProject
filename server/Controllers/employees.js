import {getAll,add, update, remove} from "./baseServer.js";

export const getEmployees = async (req, res) => {

    let employeesData = [] 
    await getAll("EMPLOYEES").then(data => employeesData = data)
     return res.send(employeesData)
}

export const addEmployee = (req, res) => {
    let newData = {
        "name": req.body.name,
        "jobCategory": req.body.jobCategory,
        "job": req.body.job,
        "salary": req.body.salary,
        "status": req.body.status,
        "startOfContract": req.body.startOfContract,
        "endOfContract": req.body.endOfContract,
        "comments": req.body.comments
    }

    if (req.body.name && req.body.jobCategory && req.body.job && req.body.salary && req.body.status && req.body.startOfContract && req.body.endOfContract){
        add('employees', newData)};
    res.send({ message: 'Data added ' });
}

export const updateEmployee= (req,res) => {
    let newData = {id:parseInt(req.params.id)}
    if (req.body.name){ newData.name = req.body.name}
    if (req.body.jobCategory){ newData.jobCategory = req.body.jobCategory}
    if (req.body.job){ newData.job = req.body.job};
    if (req.body.status === true){newData.status = true}
        else{newData.status = false};
    if (req.body.salary){ newData.salary = req.body.salary}
    if (req.body.startOfContract){ newData.startOfContract = req.body.startOfContract}
    if (req.body.endOfContract){ newData.endOfContract = req.body.endOfContract}
    if (req.body.comments){ newData.comments = req.body.comments}
    
    if (req.body.name && req.body.jobCategory && req.body.job && req.body.salary && req.body.startOfContract && req.body.endOfContract){
        update('employees',newData)}
    
    console.log(req.body.status)
    console.log(newData)
    res.send({ message: 'Data for EMPLOYEES ${id} updated successfully' });
}

export const removeEmployee = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('employees',id);
      res.status(200).send("Employee deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };