import React, { useEffect, useState, } from 'react'
import './UpdateProduct.css'

function UpdateProduct(props) {

    const productToUpdate = props.ProductToUpdate
    const [checked, setChecked] = useState(!productToUpdate.status)
   
    const [updateValues, setUpdateValues] = useState({
        productName: productToUpdate.productName,
        category: productToUpdate.category,
        supplier:  productToUpdate.supplier,
        productBrand: productToUpdate.productBrand,
        quantity: productToUpdate.quantity,
        unity: productToUpdate.unity,
        minimalQuantity: productToUpdate.minimalQuantity
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData() {
        props.OpenClose()
            fetch(`http://localhost:4000/api/stock/${productToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteProduct() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/stock/${productToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='UpdateProduct-box'>
            <form className='UpdateProduct-Box-Content'>
                <div className='UpdateProduct-Title'>Update Product</div>
                <div className='UpdateProduct-InputBox'>
                    <label className='UpdateProduct-Label'>Name: </label>
                    <input className='UpdateProductPage-Input' type="text" name='productName' value={updateValues.productName} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='AddProduct-Label'>Category: </label>
                    <select name='category' value={updateValues.category} onChange={updateData}>
                        <option value='Food'>Food</option>                       
                        <option value='Delivering Material'>Delivering Material</option>
                        <option value='Maintenance Material'>Maintenance Material</option>                       
                        <option value='Kitchen Material'>Kitchen Material</option>                       
                     </select>
                    <label className='AddProduct-Label'>Supplier: </label>
                    <input className='AddProductPage-Input' type="text" name='supplier' value={updateValues.supplier} onChange={updateData} required/>
                    <label className='AddProduct-Label'>Product Brand: </label>
                    <input className='AddProductPage-Input' type="text" name='productBrand' value={updateValues.productBrand} onChange={updateData} required/>
                    <label className='AddProduct-Label'>Quantity: </label>
                    <input className='AddProductPage-Input' type="number" name='quantity' value={updateValues.quantity} onChange={updateData} required/>
                    <label className='AddProduct-Label'>Unity: </label>
                    <select name='unity' value={updateValues.unity} onChange={updateData}>
                        <option value='kg'>Kilogramme</option>                       
                        <option value='L'>Liter</option>
                        <option value='Piece'>Piece</option>                                           
                     </select>
                    <label className='AddProduct-Label'>Minimal Quantity: </label>
                    <input className='AddProductPage-Input' type="number" name='minimalQuantity' value={updateValues.minimalQuantity} onChange={updateData} required/>

                    <div className='UpdateProduct-Buttons'>
                        <button className='UpdateProduct-Button' onClick={props.OpenClose}>Cancel</button>
                        <button className='UpdateProduct-Button' onClick={deleteProduct}>Remove Product</button>
                        <input type='submit' className='UpdateProduct-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct