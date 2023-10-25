import React, { useEffect, useState, } from 'react'
import './AddUser.css'

function AddUser(props) {

    const permissions = ['Waiter', 'Kitchen Worker', 'Direction']

    const [dataUsers, setDataUsers] = useState([])
   
    const [addValues, setAddValues] = useState({
        name: '',
        email: '',
        password:  '',
        permission:  ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
        props.OpenClose()
        if (dataUsers.find(user => user.name === addValues.name)){
            alert("Username already exists")
        }
        else{
            fetch('http://localhost:4000/api/users/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}}

    useEffect(() => {
        fetch(`http://localhost:4000/api/users`)
        .then(response => response.json())
        .then(data => setDataUsers(data))
    }, [dataUsers])

    return (
        <div className='AddUser-box'>
            <form className='AddUser-Box-Content'>
                <div className='AddUser-Title'>Add User</div>
                <div className='AddUser-InputBox'>
                    <label className='AddUser-Label'>Name: </label>
                    <input className='AddUserPage-Input' type="text" name='name' value={addValues.name} onChange={updateData} required /> 
                    <label className='AddUser-Label'>Email: </label>
                    <input className='AddUserPage-Input' type="email" name='email' value={addValues.email} onChange={updateData} required/>
                    <label className='AddUser-Label'>Password: </label>
                    <input className='AddUserPage-Input' type="text" name='password' value={addValues.password} onChange={updateData} required/>
                    <label className='AddUser-Label'>Permission :</label>
                    <select name='permission' value={addValues.permission} onChange={updateData} required>
                        <option value=''>Choice Permission</option>
                        {permissions.map((permission) => 
                             <option value={permission}>{permission}</option>
                        )}
                    </select> 
                </div>

                    <div className='AddUser-Buttons'>
                        <button className='AddUser-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type="submit" className='AddUser-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddUser