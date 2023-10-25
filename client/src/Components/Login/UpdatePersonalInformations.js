import React, { useEffect, useState, } from 'react'
import './UpdatePersonalInformations.css'

function UpdatePersonalInformations(props) {

    const userToUpdate = props.UserToUpdate
   
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
            fetch(`http://localhost:4000/api/users/${userToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    return (
        <div className='UpdateUser-box'>
            <form className='UpdatePersonalInformations-Box-Content'>
                <div className='UpdateUser-Title'>Update User</div>
                <div className='UpdateUser-InputBox'>
                    <label className='UpdateUser-Label'>Name :</label>
                    <input className='UpdateUserPage-Input' type="text" name='name' value={updateValues.name} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateUser-Label'>Email :</label>
                    <input className='UpdateUserPage-Input' type="email" name='email' value={updateValues.email} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateUser-Label'>Password :</label>
                    <input className='UpdateUserPage-Input' name='password' value={updateValues.password} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <div>
                </div>

                    <div className='UpdateUser-Buttons'>
                        <button className='UpdateUser-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type='submit' className='UpdateUser-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdatePersonalInformations