import React, { useEffect, useState, } from 'react'
import './AddProduct.css'

function AddProduct(props) {
   
    const [addValues, setAddValues] = useState({
        productName: '',
        category: '',
        supplier: '',
        productBrand: '',
        quantity: '',
        unity: '',
        minimalQuantity: ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }


    function saveData() {
        props.OpenClose()
            fetch('http://localhost:4000/api/stock/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddProduct-box'>
            <form className='AddProduct-Box-Content'>
                <div className='AddProduct-Title'>Add Product</div>
                <div className='AddProduct-InputBox'>
                    <label className='AddProduct-Label'>Name: </label>
                    <input className='AddProductPage-Input' type="text" name='productName' value={addValues.productName} onChange={updateData} required /> 
                    </div>
                    <label className='AddProduct-Label'>Category: </label>
                    <select name='category' value={addValues.category} onChange={updateData}>
                        <option value=''>Choice Category</option> 
                        <option value='Food'>Food</option>                       
                        <option value='Delivering Material'>Delivering Material</option>
                        <option value='Maintenance Material'>Maintenance Material</option>                       
                        <option value='Kitchen Material'>Kitchen Material</option>                       
                     </select>
                    
                    <label className='AddProduct-Label'>Supplier: </label>
                    <input className='AddProductPage-Input' type="text" name='supplier' value={addValues.supplier} onChange={updateData} required/>
                    <label className='AddProduct-Label'>Product Brand: </label>
                    <input className='AddProductPage-Input' type="text" name='productBrand' value={addValues.productBrand} onChange={updateData} required/>
                    <label className='AddProduct-Label'>Quantity: </label>
                    <input className='AddProductPage-Input' type="number" name='quantity' value={addValues.quantity} onChange={updateData} required/>
                    <label className='AddProduct-Label'>Unity: </label>
                    <select name='unity' value={addValues.unity} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>Choice Unity</option> 
                        <option value='kg'>Kilogramme</option>                       
                        <option value='L'>Liter</option>
                        <option value='Piece'>Piece</option>                                           
                     </select>
                    
                    <label className='AddProduct-Label'>Minimal Quantity: </label>
                    <input className='AddProductPage-Input' type="number" name='minimalQuantity' value={addValues.minimalQuantity} onChange={updateData} required/>
                

                    <div className='AddProduct-Buttons'>
                        <button className='AddProduct-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type="submit" className='AddProduct-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddProduct