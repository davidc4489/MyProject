import {getAll, add, update, remove} from "./baseServer.js";

export const getSuppliers = async (req, res) => {

    let suppliersData = [] 
    await getAll("SUPPLIERS").then(data => suppliersData = data)
     return res.send(suppliersData)
}

export const addSupplier = (req, res) => {
    let newData = {
        "name": req.body.name,
        "tel": req.body.tel,
        "mail": req.body.mail,
        "category": req.body.category,
        "product": req.body.product,
        "priceByUnity": req.body.priceByUnity,
        "unity": req.body.unity,
        "deliveryTimeInDays": req.body.deliveryTimeInDays
    }

    if (req.body.name && req.body.tel && req.body.mail && req.body.category && req.body.product && req.body.priceByUnity && req.body.unity && req.body.deliveryTimeInDays){
        add('suppliers', newData)};
    res.send({ message: 'Data added ' });
}

export const updateSupplier= (req,res) => {
    let newData = {id:req.params.id}
    if (req.body.name){ newData.name = req.body.name}
    if (req.body.tel){ newData.tel = req.body.tel}
    if (req.body.mail){ newData.mail = req.body.mail}
    if (req.body.category){ newData.category = req.body.category}
    if (req.body.product){ newData.product = req.body.product}
    if (req.body.priceByUnity){ newData.priceByUnity = req.body.priceByUnity}
    if (req.body.unity){ newData.unity = req.body.unity}
    if (req.body.deliveryTimeInDays){ newData.deliveryTimeInDays = req.body.deliveryTimeInDays}
    
    if (req.body.name && req.body.tel && req.body.mail && req.body.category && req.body.product && req.body.priceByUnity && req.body.unity && req.body.deliveryTimeInDays){
        update('suppliers',newData)}
    res.send({ message: 'Data for SUPPLIERS ${id} updated successfully' });
}

export const removeSupplier = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('suppliers',id);
      res.status(200).send("Course deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };