import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Suppliers.css'
import Sidebar from '../SideBar/SideBar.js';
import AddSupplier from './AddSupplier.js';
import UpdateSupplier from './UpdateSupplier.js';

function Suppliers() {

    const location = useLocation();
    const access = location.state ? location.state.access : null;
    const directionAccess = location.state ? location.state.directionAccess : null;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataSuppliers, setDataSuppliers] = useState([])
    const [category, setCategory] = useState('All')
    const [supplierToUpdate, setSupplierToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddSupplierDialog, setShowAddSupplierDialog] = useState(false)
    const [showUpdateSupplierDialog, setShowUpdateSupplierDialog] = useState(false)

    function openAddSupplierDialog (){
        setShowAddSupplierDialog(!showAddSupplierDialog)
    }

    function openUpdateSupplierDialog (){
        setShowUpdateSupplierDialog(!showUpdateSupplierDialog)
    }

    function updateSupplier(item){
        setShowUpdateSupplierDialog(true)
        setSupplierToUpdate(item)
    }

    function updateSearch(event){
        setSearch(event.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/suppliers`)
        .then(response => response.json())
        .then(data => setDataSuppliers(data))
    }, [dataSuppliers])

    return (
        <div className='Suppliers'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access?
            <div>
                <div className='SuppliersPage-Buttons'>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('All')}>All Suppliers</button>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('Fruits and Vegetables')}>Fruits and Vegetables Suppliers</button>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('Meat and Fish')}>Meat and Fish Suppliers</button>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('Maintenance Material')}>Maintenance Material Suppliers</button>
                    <button className='SuppliersPage-Button' onClick={() => setCategory('Kitchen and Room Material')}>Kitchen and Room Material Suppliers</button>
                    <button className='SuppliersPage-AddSupplier-Button' onClick={() => setShowAddSupplierDialog(true)}>Add Supplier</button>
                </div>
                <div className='Suppliers-TitlePage'>{category} Suppliers</div>
                <div className='SuppliersPage-SearchBox'>
                    <input type='text' className='SuppliersPage-SearchBox-Input' placeholder='Search Supplier by Name' value={search} onChange={updateSearch}></input>
                </div>
                {dataSuppliers.length &&
                    <div>
                        <div className='Suppliers-Headers'>
                            <div className='Suppliers-Header'> Id </div>
                            <div className='Suppliers-Header'> Name </div>
                            <div className='Suppliers-Header'> Telephone Number </div>
                            <div className='Suppliers-Header'> Email </div>
                            <div className='Suppliers-Header'> Category</div>
                            <div className='Suppliers-Header'> Product </div>
                            <div className='Suppliers-Header'> Price by Unity </div>
                            <div className='Suppliers-Header'> Unity </div>
                            <div className='Suppliers-Header'> Delivery Time in Days </div>
                        </div>
                            {dataSuppliers.map((item) => (
                                ((category === 'All' || category == item.category) && (item.name.includes(search))) &&
                            <button key={item.id} className='Suppliers-SupplierRow' onClick={() => updateSupplier(item)}>
                                <div className='Suppliers-row-field'> {item.id} </div>
                                <div className='Suppliers-row-field'> {item.name} </div>
                                <div className='Suppliers-row-field'> {item.tel} </div>
                                <div className='Suppliers-row-field'> {item.mail} </div>
                                <div className='Suppliers-row-field'> {item.category} </div>
                                <div className='Suppliers-row-field'> {item.product} </div>
                                <div className='Suppliers-row-field'> {item.priceByUnity} </div>
                                <div className='Suppliers-row-field'> {item.unity} </div>
                                <div className='Suppliers-row-field'> {item.deliveryTimeInDays} </div>
                            </button>))}

                            {showAddSupplierDialog ? <AddSupplier OpenClose={openAddSupplierDialog}/> : null}
                            {showUpdateSupplierDialog ? <UpdateSupplier OpenClose={openUpdateSupplierDialog} SupplierToUpdate={supplierToUpdate}/> : null} 
                    </div>}
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>

    );
}
export default Suppliers