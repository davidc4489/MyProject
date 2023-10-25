import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Users.css'
import Sidebar from '../SideBar/SideBar.js';
import AddUser from './AddUser.js';
import UpdateUser from './UpdateUser.js';

function Users() {

    const location = useLocation();
    const access = location.state ? location.state.access : null;
    const directionAccess = location.state ? location.state.directionAccess : null;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataUsers, setDataUsers] = useState([])
    const [category, setCategory] = useState('All Users')
    const [userToUpdate, setUserToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddUserDialog, setShowAddUserDialog] = useState(false)
    const [showUpdateUserDialog, setShowUpdateUserDialog] = useState(false)

    function updateSearch(event){
        setSearch(event.target.value)
    }
    
    function openAddUserDialog (){
        setShowAddUserDialog(!showAddUserDialog)
    }

    function openUpdateUserDialog (){
        setShowUpdateUserDialog(!showUpdateUserDialog)
    }

    function updateUser(item){
        setShowUpdateUserDialog(true)
        setUserToUpdate(item)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/users`)
        .then(response => response.json())
        .then(data => setDataUsers(data))
    }, [dataUsers])

    return (
        <div className='Users'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {(access && directionAccess)?
            <div>
                <div className='UsersPage-Buttons'>
                    <button className='UsersPage-Button' onClick={() => setCategory('All Users')}>All Users</button>
                    <button className='UsersPage-Button' onClick={() => setCategory('Waiter')}>Waiters</button>
                    <button className='UsersPage-Button' onClick={() => setCategory('Kitchen Worker')}>Kitchen Worker</button>
                    <button className='UsersPage-Button' onClick={() => setCategory('Direction')}>Direction</button>
                    <button className='UsersPage-AddUser-Button' onClick={() => setShowAddUserDialog(true)}>Add User</button>
                </div>
                <div className='Users-TitlePage'>{category}</div>

                <div className='UsersPage-SearchBox'>
                    <input type='text' className='UsersPage-SearchBox-Input' placeholder='Search User by Name' value={search} onChange={updateSearch}></input>
                </div>

                {dataUsers.length &&
                    <div>
                        <div className='Users-Headers'>
                            <div> Id </div>
                            <div> Name </div>
                            <div> Email </div>
                            <div> Password </div>
                            <div> Permission </div>
                        </div>
                            {dataUsers.map((item) => (
                                ((category === 'All Users' || category == item.permission) && (item.name.includes(search))) &&
                            <button key={item.id} className='Users-UserRow' onClick={() => updateUser(item)}>
                                    <div className='row-field'> {item.id} </div>
                                    <div className='row-field'> {item.name} </div>
                                    <div className='row-field'> {item.email} </div>
                                    <div className='row-field'> {item.password} </div>
                                    <div className='row-field'> {item.permission} </div>
                            </button>
                            ))}
                        
                            {showAddUserDialog ? <AddUser OpenClose={openAddUserDialog}/> : null}
                            {showUpdateUserDialog ? <UpdateUser OpenClose={openUpdateUserDialog} UserToUpdate={userToUpdate}/> : null}                           
                    </div>}
                </div>:<div className='NoAccessUsersAlert'>To access the data please login with management permission</div>}
        </div>
    );
}
export default Users