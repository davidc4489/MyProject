import React, { useEffect, useState, } from 'react'
import './UpdateSupplier.css'

function UpdateSupplier(props) {

    const supplierToUpdate = props.SupplierToUpdate
    const [dataSuppliers, setDataSuppliers] = useState([])
   
    const [updateValues, setUpdateValues] = useState({
        name: supplierToUpdate.name,
        tel: supplierToUpdate.tel,
        mail:  supplierToUpdate.mail,
        category: supplierToUpdate.category,
        product: supplierToUpdate.product,
        priceByUnity: supplierToUpdate.priceByUnity,
        unity: supplierToUpdate.unity,
        deliveryTimeInDays: supplierToUpdate.deliveryTimeInDays
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData() {
        props.OpenClose()
            fetch(`http://localhost:4000/api/suppliers/${supplierToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteSupplier() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/suppliers/${supplierToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='UpdateSupplier-box'>
            <form className='UpdateSupplier-Box-Content'>
                <div className='UpdateSupplier-Title'>Update Supplier</div>
                <div className='UpdateSupplier-InputBox'>
                <label className='UpdateSupplier-Label'>Name: </label>
                    <input className='UpdateSupplierPage-Input' type="text" name='name' value={updateValues.name} onChange={updateData} required /> 
                    <label className='UpdateSupplier-Label'>Tel: </label>
                    <input className='UpdateSupplierPage-Input' type="text" name='tel' value={updateValues.tel} onChange={updateData} required /> 
                    <label className='UpdateSupplier-Label'>Mail: </label>
                    <input className='UpdateSupplierPage-Input' type="email" name='mail' value={updateValues.mail} onChange={updateData} required /> 
                    <label className='UpdateSupplier-Label'>Product: </label>
                    <input className='UpdateSupplierPage-Input' type="text" name='product' value={updateValues.product} onChange={updateData} required/>
                    <label className='UpdateSupplier-Label'>Price By Unity: </label>
                    <input className='UpdateSupplierPage-Input' type='number' name='priceByUnity' value={updateValues.priceByUnity} onChange={updateData}/>
                    <label className='UpdateSupplier-Label'>Unity: </label>
                    <select name='unity' value={updateValues.unity} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>Choice Unity</option> 
                        <option value='kg'>Kilogramme</option>                       
                        <option value='L'>Liter</option>
                        <option value='Piece'>Piece</option>                                           
                     </select>
                    <label className='UpdateSupplier-Label'>Delivery Time In Days: </label>
                    <input className='UpdateSupplierPage-Input' type='number' name='deliveryTimeInDays' value={updateValues.deliveryTimeInDays} onChange={updateData}/>

                    <div className='UpdateSupplier-Buttons'>
                        <button className='UpdateSupplier-Button' onClick={props.OpenClose}>Cancel</button>
                        <button className='UpdateSupplier-Button' onClick={deleteSupplier}>Remove Supplier</button>
                        <input type='submit' className='UpdateSupplier-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateSupplier