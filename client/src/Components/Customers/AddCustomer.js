import React, { useEffect, useState, } from 'react'
import './AddCustomer.css'

function AddCustomer(props) {
   
    const [addValues, setAddValues] = useState({
        name: '',
        size: ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }


    function saveData() {
        props.OpenClose()
            fetch('http://localhost:4000/api/customers/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddCustomer-box'>
            <form className='AddCustomer-Box-Content'>
                <div className='AddCustomer-Title'>Add Customer</div>
                <div className='AddCustomer-InputBox'>
                    <label className='AddCustomer-Label'>Name: </label>
                    <input className='AddCustomerPage-Input' type="text" name='name' value={addValues.name} onChange={updateData} required /> 
                    <label className='AddCustomer-Label'>Size: </label>
                    <input className='AddCustomerPage-Input' type="number" name='size' value={addValues.size} onChange={updateData} required/>
                </div>

                    <div className='AddCustomer-Buttons'>
                        <button className='AddCustomer-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type="submit" className='AddCustomer-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddCustomer