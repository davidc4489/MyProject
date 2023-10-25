import {getAll, add, update, remove} from "./baseServer.js";

export const getStock = async (req, res) => {

    let stockData = [] 
    await getAll("STOCK").then(data => stockData = data)
     return res.send(stockData)
}

export const addProduct = (req, res) => {
    let newData = {
        "productName": req.body.productName,
        "category": req.body.category,
        "supplier": req.body.supplier,
        "productBrand": req.body.productBrand,
        "quantity": req.body.quantity,
        "unity": req.body.unity,
        "minimalQuantity": req.body.minimalQuantity
    }
    console.log(newData)
    if (req.body.productName && req.body.category && req.body.supplier && req.body.productBrand && req.body.quantity && req.body.unity && req.body.minimalQuantity){
        add('stock', newData)};
    res.send({ message: 'Data added ' });
}

export const updateProduct= (req,res) => {
    let newData = {id:req.params.id}
    if (req.body.productName){ newData.productName = req.body.productName}
    if (req.body.category){ newData.category = req.body.category}
    if (req.body.supplier){ newData.supplier = req.body.supplier}
    if (req.body.productBrand){ newData.productBrand = req.body.productBrand}
    if (req.body.quantity){ newData.quantity = req.body.quantity}
    if (req.body.unity){ newData.unity = req.body.unity}
    if (req.body.minimalQuantity){ newData.minimalQuantity = req.body.minimalQuantity}
    
    if (req.body.productName && req.body.category && req.body.supplier && req.body.productBrand && req.body.quantity && req.body.unity && req.body.minimalQuantity){
        update('stock',newData)}
    res.send({ message: 'Data for STOCK ${id} updated successfully' });
}

export const removeProduct = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('stock',id);
      res.status(200).send("Course deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };