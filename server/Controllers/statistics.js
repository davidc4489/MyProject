import {getAll, add, update, remove, getOrdersStatistics, getAmount} from "./baseServer.js";
import sqlite3 from 'sqlite3';
let db = new sqlite3.Database('./database.db');

export const getStat = async (req, res) => {
    let menuData = [] 
    await getOrdersStatistics().then(data => menuData = data)
     return res.send(menuData)
}

export const getStatByPercent = async (req, res) => {
    let amountData
    await getAmount().then(data => amountData = data[0].amount)

    let menuData = [] 
    await getOrdersStatistics().then(data => menuData = data)
    
    let dataPerPercent = menuData.map (({amount}) => Math.round((amount/amountData)*10000)/100)
     return res.send(dataPerPercent)
}
