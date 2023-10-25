import React, { useEffect, useState, } from 'react'
import './AddTable.css'

function AddTable(props) {
   
    const [addValues, setAddValues] = useState({
        name: '',
        capacity: '',
        description:  ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
        props.OpenClose()
            fetch('http://localhost:4000/api/tables/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddTable-box'>
            <form className='AddTable-Box-Content'>
                <div className='AddTable-Title'>Add Table</div>
                <div className='AddTable-InputBox'>
                    <label className='AddTable-Label'>Name: </label>
                    <input className='AddTablePage-Input' type="text" name='name' value={addValues.name} onChange={updateData} required /> 
                    <label className='AddTable-Label'>Capacity: </label>
                    <input className='AddTablePage-Input' type="number" name='capacity' value={addValues.capacity} onChange={updateData} required/>
                    <label className='AddTable-Label'>Description: </label>
                    <textarea className='AddTablePage-Input' name='description' value={addValues.description} onChange={updateData}/>
                </div>

                    <div className='AddTable-Buttons'>
                        <button className='AddTable-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type="submit" className='AddTable-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddTable