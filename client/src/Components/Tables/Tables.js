import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Tables.css'
import Sidebar from '../SideBar/SideBar.js';
import AddTable from './AddTable.js';
import UpdateTable from './UpdateTable.js';

function Tables() {

    const location = useLocation();
    const access = location.state ? location.state.access : null;
    const directionAccess = location.state ? location.state.directionAccess : null;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataTables, setDataTables] = useState([])
    const [category, setCategory] = useState('All Tables')
    const [tableToUpdate, setTableToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddTableDialog, setShowAddTableDialog] = useState(false)
    const [showUpdateTableDialog, setShowUpdateTableDialog] = useState(false)

    function updateSearch(event){
        setSearch(event.target.value)
    }
    
    function openAddTableDialog (){
        setShowAddTableDialog(!showAddTableDialog)
    }

    function openUpdateTableDialog (){
        setShowUpdateTableDialog(!showUpdateTableDialog)
    }

    function updateTable(item){
        setShowUpdateTableDialog(true)
        setTableToUpdate(item)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/tables`)
        .then(response => response.json())
        .then(data => setDataTables(data))
    }, [dataTables])

    return (
        <div className='Tables'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access?
            <div>
                <div className='TablesPage-Buttons'>
                    <button className='TablesPage-Button' onClick={() => setCategory('All Tables')}>All Tables</button>
                    <button className='TablesPage-Button' onClick={() => setCategory(true)}>Free Tables</button>
                    <button className='TablesPage-Button' onClick={() => setCategory(false)}>Occupied Tables</button>
                    <button className='TablesPage-AddTable-Button' onClick={() => setShowAddTableDialog(true)}>Add Table</button>
                </div>
                {category === 'All Tables' &&<div className='Tables-TitlePage'>{category}</div>}
                {category == true &&<div className='Tables-TitlePage'>Free Tables</div>}
                {category == false &&<div className='Tables-TitlePage'>Occupied Tables</div>}

                <div className='TablesPage-SearchBox'>
                    <input type='text' className='TablesPage-SearchBox-Input' placeholder='Search Table by Name' value={search} onChange={updateSearch}></input>
                </div>

                {dataTables.length &&
                    <div>
                        <div className='Tables-Headers'>
                            <div> Id </div>
                            <div> Name </div>
                            <div> Capacity </div>
                            <div> Description </div>
                            <div> Status </div>
                            <div> Customers </div>
                        </div>
                            {dataTables.map((item) => (
                                ((category === 'All Tables' || category == item.status) && (item.name.includes(search))) &&
                            <button key={item.id} className='Tables-TableRow' onClick={() => updateTable(item)}>
                                    <div className='row-field'> {item.id} </div>
                                    <div className='row-field'> {item.name} </div>
                                    <div className='row-field'> {item.capacity} </div>
                                    <div className='row-field'> {item.description} </div>
                                    <div className='row-field'> {item.status ? <p className='p-invalid'>Free</p> : <p className='p-valid'>Occupied</p>} </div>
                                    <div className='row-field'> {item.customers} </div>
                            </button>
                            ))}
                        
                            {showAddTableDialog ? <AddTable OpenClose={openAddTableDialog}/> : null}
                            {showUpdateTableDialog ? <UpdateTable OpenClose={openUpdateTableDialog} TableToUpdate={tableToUpdate}/> : null}                           
                    </div>}
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>
    );
}
export default Tables