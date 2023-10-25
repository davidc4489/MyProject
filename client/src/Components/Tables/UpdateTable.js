import React, { useEffect, useState, } from 'react'
import './UpdateTable.css'

function UpdateTable(props) {

    const tableToUpdate = props.TableToUpdate
    const [checked, setChecked] = useState(!tableToUpdate.status)
    const [dataCustomers, setDataCustomers] = useState([])
   
    const [updateValues, setUpdateValues] = useState({
        name: tableToUpdate.name,
        capacity: tableToUpdate.capacity,
        description:  tableToUpdate.description,
        status: tableToUpdate.status,
        customers: tableToUpdate.customers
    });

    function updateData(event) {
        if(event.target.name !== 'status'){
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })}
        else{
            setUpdateValues({
                ...updateValues,
                status: checked,
            })
        }
    }

    function checkedStatus(event){
        setChecked(!checked)
        updateData(event)
    }

    function saveData() {
        props.OpenClose()
            fetch(`http://localhost:4000/api/tables/${tableToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteTable() {
        props.OpenClose()
        if(tableToUpdate.customers == ''){
        fetch(`http://localhost:4000/api/tables/${tableToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tableToUpdate),
        })
            .then(response => {response.json()})}
        else{alert('Customer on the table ! You cannot remove the table !')}
}

    useEffect(() => {
        fetch(`http://localhost:4000/api/customers`)
        .then(response => response.json())
        .then(data => setDataCustomers(data))
    }, [])

    return (
        <div className='UpdateTable-box'>
            <form className='UpdateTable-Box-Content'>
                <div className='UpdateTable-Title'>Update Table</div>
                <div className='UpdateTable-InputBox'>
                    <label className='UpdateTable-Label'>Name: </label>
                    <input className='UpdateTablePage-Input' type="text" name='name' value={updateValues.name} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateTable-Label'>Capacity: </label>
                    <input className='UpdateTablePage-Input' type="number" name='capacity' value={updateValues.capacity} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateTable-Label'>Description: </label>
                    <textarea className='UpdateTablePage-Input' name='description' value={updateValues.description} onChange={updateData}/>
                    <div className='UpdateTable-Checkbox'>
                    <label className='UpdateTable-Label'>Occupied: </label>
                    <input className='UpdateTablePage-Input' type="checkbox" name='status' checked={checked} onChange={checkedStatus}/> 
                    </div>
                   <select name='customers' value={updateValues.customers} onChange={updateData}>
                        <option value=''>Choice Customer</option>
                        {dataCustomers.map((item) => 
                            <option value={item.name}>{item.name}</option>
                        )}
                    </select>
                    <div>
                </div>

                    <div className='UpdateTable-Buttons'>
                        <button className='UpdateTable-Button' onClick={props.OpenClose}>Cancel</button>
                        <button className='UpdateTable-Button' onClick={deleteTable}>Remove Table</button>
                        <input type='submit' className='UpdateTable-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateTable