import React, { useEffect, useState, } from 'react'
import './AddSupplier.css'

function AddSupplier(props) {
   
    const [addValues, setAddValues] = useState({
        name: '',
        tel: '',
        mail: '',
        category: '',
        product: '',
        priceByUnity: '',
        unity: '',
        deliveryTimeInDays:  ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
        props.OpenClose()
            fetch('http://localhost:4000/api/suppliers/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddSupplier-box'>
            <form className='AddSupplier-Box-Content'>
                <div className='AddSupplier-Title'>Add Supplier</div>
                <div className='AddSupplier-InputBox'>
                    <label className='AddSupplier-Label'>Name: </label>
                    <input className='AddSupplierPage-Input' type="text" name='name' value={addValues.name} onChange={updateData} required /> 
                    <label className='AddSupplier-Label'>Tel: </label>
                    <input className='AddSupplierPage-Input' type="text" name='tel' value={addValues.tel} onChange={updateData} required /> 
                    <label className='AddSupplier-Label'>Mail: </label>
                    <input className='AddSupplierPage-Input' type="email" name='mail' value={addValues.mail} onChange={updateData} required /> 
                    <label className='AddSupplier-Label'>Product: </label>
                    <input className='AddSupplierPage-Input' type="text" name='product' value={addValues.product} onChange={updateData} required/>
                    <label className='AddSupplier-Label'>Price By Unity: </label>
                    <input className='AddSupplierPage-Input' type='number' name='priceByUnity' value={addValues.priceByUnity} onChange={updateData}/>
                    <label className='AddSupplier-Label'>Unity: </label>
                    <select name='unity' value={addValues.unity} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>Choice Unity</option> 
                        <option value='kg'>Kilogramme</option>                       
                        <option value='L'>Liter</option>
                        <option value='Piece'>Piece</option>                                           
                     </select>
                    <label className='AddSupplier-Label'>Delivery Time In Days: </label>
                    <input className='AddSupplierPage-Input' type='number' name='deliveryTimeInDays' value={addValues.deliveryTimeInDays} onChange={updateData}/>
                </div>

                    <div className='AddSupplier-Buttons'>
                        <button className='AddSupplier-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type="submit" className='AddSupplier-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddSupplier