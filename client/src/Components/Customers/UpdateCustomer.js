import React, { useEffect, useState, } from 'react'
import './UpdateCustomer.css'

function UpdateCustomer(props) {

    const customerToUpdate = props.CustomerToUpdate
    const [dataTables, setDataTables] = useState([])
   
    const [updateValues, setUpdateValues] = useState({
        name: customerToUpdate.name,
        size: customerToUpdate.size,
        status: customerToUpdate.status,
        tableId: customerToUpdate.tableId
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
        console.log(updateValues)
    }

    function saveData() {
            props.OpenClose()
            fetch(`http://localhost:4000/api/customers/${customerToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteCustomer() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/customers/${customerToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customerToUpdate),
        })
            .then(response => {response.json()})
}

    useEffect(() => {
        fetch(`http://localhost:4000/api/tables`)
        .then(response => response.json())
        .then(data => setDataTables(data))
    }, [])

    return (
        <div className='UpdateCustomer-box'>
            <form className='UpdateCustomer-Box-Content'>
                <div className='UpdateCustomer-Title'>Update Table</div>
                <div className='UpdateCustomer-InputBox'>
                    <label className='UpdateCustomer-Label'>Name: </label>
                    <input className='UpdateCustomerPage-Input' type="text" name='name' value={updateValues.name} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateCustomer-Label'>Size: </label>
                    <input className='UpdateCustomerPage-Input' type="number" name='size' value={updateValues.size} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateCustomer-Label'>Status: </label>
                    <select name='status' value={updateValues.status} onChange={updateData}>
                        <option value='Waiting for table'>Waiting for table</option>
                        <option value='Seated'>Seated</option>
                        <option value='Waiting for bill'>Waiting for bill</option>
                        <option value='Done'>Done</option>
                    </select>
                    <label className='UpdateCustomer-Label'>Table: </label>
                   <select name='tableId' value={updateValues.tableId} onChange={updateData}>
                        <option value=''>Choice Table</option>
                        {dataTables.map((item) => 
                            (((item.status) || (item.customers == customerToUpdate.name)) && item.capacity >= customerToUpdate.size) &&
                             <option value={item.id}>{item.name}</option>
                        )}
                    </select>
                    <div>
                </div>

                    <div className='UpdateCustomer-Buttons'>
                        <button className='UpdateCustomer-Button' onClick={props.OpenClose}>Cancel</button>
                        <button className='UpdateCustomer-Button' onClick={deleteCustomer}>Remove Customer</button>
                        <input type='submit' className='UpdateCustomer-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateCustomer