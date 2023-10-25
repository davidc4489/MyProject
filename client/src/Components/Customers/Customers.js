import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Customers.css'
import Sidebar from '../SideBar/SideBar.js';
import AddCustomer from './AddCustomer.js';
import UpdateCustomer from './UpdateCustomer.js';
import Bill from './Bill.js';
import Order from './Order.js';

function Customers() {

    const location = useLocation();
    const [access, setAccess] = useState(() => location.state ? location.state.access : false);
    const [directionAccess, setDirectionAccess] = useState(() => location.state ? location.state.directionAccess : false);
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataCustomers, setDataCustomers] = useState([])
    const [category, setCategory] = useState('All Customers')
    const [customerToUpdate, setCustomerToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false)
    const [showUpdateCustomerDialog, setShowUpdateCustomerDialog] = useState(false)
    const [showBillDialog, setShowBillDialog] = useState(false)
    const [showOrderDialog, setShowOrderDialog] = useState(false)

    function openAddCustomerDialog (){
        setShowAddCustomerDialog(!showAddCustomerDialog)
    }

    function openUpdateCustomerDialog (){
        setShowUpdateCustomerDialog(!showUpdateCustomerDialog)
    }

    function updateCustomer(item){
        setShowUpdateCustomerDialog(true)
        setCustomerToUpdate(item)
    }

    function updateSearch(event){
        setSearch(event.target.value)
    }

    function bill(item){
        if(item.status == 'Waiting for bill'){
            setShowBillDialog(true)
            setCustomerToUpdate(item)
        }else{
            alert('Customer not waiting for bill')
        }
    }

    function order(item){
        if(item.status == 'Seated' || item.status == 'Waiting for bill'){
            setShowOrderDialog(true)
            setCustomerToUpdate(item)
        }else{
            alert('Customer not seated or done')
        }
    }

    function openBillDialog (){
        setShowBillDialog(!showBillDialog)
    }

    function openOrderDialog (){
        setShowOrderDialog(!showOrderDialog)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/customers`)
        .then(response => response.json())
        .then(data => setDataCustomers(data))
    }, [dataCustomers])

    return (
        <div className='Customers'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access?
            <div>
                <div className='CustomersPage-Buttons'>
                    <button className='CustomersPage-Button' onClick={() => setCategory('All Customers')}>All Customers</button>
                    <button className='CustomersPage-Button' onClick={() => setCategory('Waiting for table')}>Waiting for table</button>
                    <button className='CustomersPage-Button' onClick={() => setCategory('Seated')}>Seated</button>
                    <button className='CustomersPage-Button' onClick={() => setCategory('Waiting for bill')}>Waiting for bill</button>
                    <button className='CustomersPage-Button' onClick={() => setCategory('Done')}>Done</button>
                    <button className='CustomersPage-AddCustomer-Button' onClick={() => setShowAddCustomerDialog(true)}>Add Customer</button>
                </div>
                <div className='Customers-TitlePage'>{category}</div>
                <div className='CustomerPage-SearchBox'>
                    <input type='text' className='CustomerPage-SearchBox-Input' placeholder='Search Customer by Name' value={search} onChange={updateSearch}></input>
                </div>
                {dataCustomers.length &&
                    <div>
                        <div className='Customers-Headers'>
                            <div className='Customers-Header'> Id </div>
                            <div className='Customers-Header'> Name </div>
                            <div className='Customers-Header'> Size </div>
                            <div className='Customers-Header'> Status </div>
                            <div className='Customers-Header'> Table </div>
                            <div className='Customers-Header'>Order</div>
                            <div className='Customers-Header'>Bill</div>
                        </div>
                            {dataCustomers.map((item) => (
                                ((category === 'All Customers' || category === item.status) && (item.name.includes(search))) &&
                            <div className='Customers-CustomersRow-Buttons'>
                            <button key={item.id} className='Customers-CustomerRow' onClick={() => updateCustomer(item)}>
                                <div className='Customer-row-field'> {item.id} </div>
                                <div className='Customer-row-field'> {item.name} </div>
                                <div className='Customer-row-field'> {item.size} </div>
                                <div className='Customer-row-field'> {item.status} </div>
                                <div className='Customer-row-field'> {item.tableId} </div>
                            </button>
                            <button className='Customer-row-field-OrderButton' onClick={() => order(item)}>Order</button>
                            <button className='Customer-row-field-BillButton' onClick={() => bill(item)}>Bill</button>
                            </div>
                            ))}

                            {showAddCustomerDialog ? <AddCustomer OpenClose={openAddCustomerDialog}/> : null}
                            {showUpdateCustomerDialog ? <UpdateCustomer OpenClose={openUpdateCustomerDialog} CustomerToUpdate={customerToUpdate}/> : null}
                            {showBillDialog ? <Bill OpenClose={openBillDialog} CustomerToUpdate={customerToUpdate}/> : null}
                            {showOrderDialog ? <Order OpenClose={openOrderDialog} CustomerToUpdate={customerToUpdate}/> : null}
                    </div>}
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>

    );
}
export default Customers