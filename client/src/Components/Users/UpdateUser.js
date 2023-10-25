import React, { useEffect, useState, } from 'react'
import './UpdateUser.css'

function UpdateUser(props) {

    const userToUpdate = props.UserToUpdate
    const permissions = ['Waiter', 'Kitchen Worker', 'Direction']

    const [dataUsers, setDataUsers] = useState([])
   
    const [updateValues, setUpdateValues] = useState({
        name: userToUpdate.name,
        email: userToUpdate.email,
        password:  userToUpdate.password,
        permission: userToUpdate.permission
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })}

    function saveData() {
        props.OpenClose()
        if (dataUsers.find(user => (user.name === updateValues.name && userToUpdate.name !== updateValues.name))){
            alert("Username already exists")
        }
        else{
            fetch(`http://localhost:4000/api/users/${userToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }}

    function deleteUser() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/users/${userToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToUpdate),
        })
            .then(response => {response.json()})
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/users`)
        .then(response => response.json())
        .then(data => setDataUsers(data))
    }, [dataUsers])

    return (
        <div className='UpdateUser-box'>
            <form className='UpdateUser-Box-Content'>
                <div className='UpdateUser-Title'>Update User</div>
                <div className='UpdateUser-InputBox'>
                    <label className='UpdateUser-Label'>Name :</label>
                    <input className='UpdateUserPage-Input' type="text" name='name' value={updateValues.name} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateUser-Label'>Email :</label>
                    <input className='UpdateUserPage-Input' type="email" name='email' value={updateValues.email} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateUser-Label'>Password :</label>
                    <input className='UpdateUserPage-Input' name='password' value={updateValues.password} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateUser-Label'>Permission :</label>
                   <select name='permission' value={updateValues.permission} onChange={updateData}>
                        <option value=''>Choice Permission</option>
                        {permissions.map((permission) => 
                            <option value={permission}>{permission}</option>
                        )}
                    </select>
                    <div>
                </div>

                    <div className='UpdateUser-Buttons'>
                        <button className='UpdateUser-Button' onClick={props.OpenClose}>Cancel</button>
                        <button className='UpdateUser-Button' onClick={deleteUser}>Remove User</button>
                        <input type='submit' className='UpdateUser-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateUser