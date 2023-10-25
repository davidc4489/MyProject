import {getAll, getItem, add, update, remove} from "./baseServer.js";
import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./database.db');

export const getCustomers = async (req, res) => {

    let customersData = [] 
    await getAll("CUSTOMERS").then(data => customersData = data)
     return res.send(customersData)
}

export const addCustomer = (req, res) => {
    let newData = {
        "name": req.body.name,
        "size": req.body.size,
        "status": 'Waiting for table',
        "tableId": null,
    }

    if (req.body.name && req.body.size){
        add('customers', newData)};
    res.send({ message: 'Data added ' });
}

export const updateCustomer = (req,res) => {
    let newData = {id:req.params.id}

    if (req.body.name){ newData.name = req.body.name}
    if (req.body.size){ newData.size = req.body.size}
    req.body.tableId == '' ? (newData.status = 'Waiting for table') : (newData.status = req.body.status)
    req.body.tableId != ''? (newData.tableId = req.body.tableId) : (newData.tableId = '')
    if(req.body.status == 'Waiting for table' || req.body.status == 'Done'){
        (newData.tableId = '')}
    else{(newData.tableId = req.body.tableId)}
    
    if(req.body.tableId != '' ){
        update('TABLES',{id:req.body.tableId, status: false, customers: req.body.name})
    }

    if(req.body.tableId == '' || req.body.status == 'Waiting for table' || req.body.status == 'Done'){
        update('TABLES',{id:req.body.tableId, status: true, customers: ''})
    }

    if (req.body.name && req.body.size){
        update('customers',newData)}
    res.send({ message: 'Data for ALLCUSTOMERS ${id} updated successfully' });
}

export const updateOrderCustomer = async (req,res) => {
    let newData = {customerId:parseInt(req.params.id)}
    let length = req.body.length

    let ordersData = [] 
    await getAll("ORDERSLIST").then(data => ordersData = data)

    console.log(length)
    for (let i = 0; i < length; i++){
        newData.dishId = parseInt(req.body[i].itemId)
        newData.amount = parseInt(req.body[i].amount)
        newData.category = req.body[i].itemCat
        console.log(req.body[i].itemCat)
        let existOrder = ordersData.find(order => order.customerId === newData.customerId && order.dishId === newData.dishId)
        if(existOrder){
             newData.amount = existOrder.amount + newData.amount
             if(newData.amount !== 0){
             update('OrdersList', 
             {id:existOrder.id, category: existOrder.category, amount: newData.amount})}
             else{remove('ordersList', existOrder.id)}}
        else{
            add('OrdersList',newData)}
        console.log(newData)
    }
}

export const removeCustomer = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('CUSTOMERS',id);
      res.status(200).send("Course deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };

 export const getCustomerOrder = async (req, res) => {
    let orderData = null
    let menuData
    await getAll("menu").then(data => menuData = data)
    let dataToSend = []

    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM OrdersList WHERE customerId = ?`;
        db.all(query, req.params.id, (err, row) => {
            if (err) {
                console.error('Error fetching data:', err);
                reject(err);
            } else {
                resolve(row);
            }
        });;
    }).then(data => {
        orderData = Array.from(data)
        for(let order of orderData){
            for(let dish of menuData){
                if(order.dishId == dish.id){
                    dataToSend.push({[dish.name]:order.amount, TotalPrice:[dish.price]*[order.amount]})
                }
            }
        }
        console.log(dataToSend)
        return res.send(dataToSend)
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

};