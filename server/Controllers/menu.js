import {getAll, add, update, remove} from "./baseServer.js";

export const getMenu = async (req, res) => {
    let menuData = [] 
    await getAll("menu").then(data => menuData = data)
     return res.send(menuData)
}

export const addDish = (req, res) => {
    let newData = {
        "name": req.body.name,
        "category": req.body.category,
        "price": req.body.price,
        "recipeId": null
    }

    if (req.body.name && req.body.category && req.body.price){
        add('menu', newData)};
    res.send({ message: 'Data added ' });
}

export const updateDish = (req,res) => {
    let newData = {id:req.params.id}
    if (req.body.name){ newData.name = req.body.name}
    if (req.body.category){ newData.category = req.body.category}
    if (req.body.price){ newData.price = req.body.price}
    if (req.body.recipeId){ newData.recipeId = req.body.recipeId}
    
    if (req.body.name && req.body.category && req.body.price){
        update('menu',newData)}
    res.send({ message: 'Data for MENU ${id} updated successfully' });
}

export const removeDish = (req, res) => {
    const id = req.body.id;
    
    try {
      remove('menu',id);
      res.status(200).send("Course deleted successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  };