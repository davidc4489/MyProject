import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Employees.css'
import Sidebar from '../SideBar/SideBar.js';
import AddEmployee from './AddEmployee.js';
import UpdateEmployee from './UpdateEmployee.js';

function Employees() {

    const [dataEmployees, setDataEmployees] = useState([])
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All')
    // const [status, setStatus] = useState(true)
    const [employeeToUpdate, setEmployeeToUpdate] = useState(null)

    const location = useLocation();
    const access = location.state ? location.state.access : null;
    const directionAccess = location.state ? location.state.directionAccess : null;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false)
    const [showUpdateEmployeeDialog, setShowUpdateEmployeeDialog] = useState(false)

    function openAddEmployeeDialog (){
        setShowAddEmployeeDialog(!showAddEmployeeDialog)
    }

    function openUpdateEmployeeDialog (){
        setShowUpdateEmployeeDialog(!showUpdateEmployeeDialog)
    }

    function updateEmployee(item){
        setShowUpdateEmployeeDialog(true)
        setEmployeeToUpdate(item)
    }

    function updateSearch(event){
        setSearch(event.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/employees`)
        .then(response => response.json())
        .then(data => setDataEmployees(data))
    }, [dataEmployees])

    return (
        <div className='Employees'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access?
            <div>
                <div className='EmployeesPage-Buttons'>
                    <button className='EmployeesPage-Button' onClick={() => setCategory('All')}>All Employees</button>
                    <button className='EmployeesPage-Button' onClick={() => setCategory('Kitchen Worker')}>Kitchen Workers</button>
                    <button className='EmployeesPage-Button' onClick={() => setCategory('Waiter')}>Waiters</button>
                    <button className='EmployeesPage-Button' onClick={() => setCategory('Other')}>Others</button>
                    <button className='EmployeesPage-Button' onClick={() => setCategory('Former Employee')}>Former Employees</button>
                    <button className='EmployeesPage-AddEmployee-Button' onClick={() => setShowAddEmployeeDialog(true)}>Add Employee</button>
                </div>
                <div className='Employees-TitlePage'>{category}</div>
                <div className='CustomerPage-SearchBox'>
                    <input type='text' className='CustomerPage-SearchBox-Input' placeholder='Search Employee by Name' value={search} onChange={updateSearch}></input>
                </div>
                    <div>
                        <div className='Employees-Headers'>
                            <div className='Employees-Header'> Id </div>
                            <div className='Employees-Header'> Name </div>
                            <div className='Employees-Header'> Job Category </div>
                            <div className='Employees-Header'> Job </div>
                            <div className='Employees-Header'> Salary </div>
                            <div className='Employees-Header'> Start of Contract </div>
                            <div className='Employees-Header'> End of Contract </div>
                            <div className='Employees-Header'> Comments </div>
                            <div className='Employees-Header'> Status </div>
                        </div>
                        {dataEmployees.length > 0 && (
                            <div>
                            {dataEmployees.map((item) => (
                                 ((category === 'All'|| (category == item.jobCategory && item.status == true) || (category == 'Former Employee' && item.status == false)) && (item.name.includes(search))) &&
                            <button key={item.id} className='Employees-EmployeeRow' onClick={() => updateEmployee(item)}>
                                <div className='Employee-row-field'> {item.id} </div>
                                <div className='Employee-row-field'> {item.name} </div>
                                <div className='Employee-row-field'> {item.jobCategory} </div>
                                <div className='Employee-row-field'> {item.job} </div>
                                <div className='Employee-row-field'> {item.salary} </div>
                                <div className='Employee-row-field'> {item.startOfContract} </div>
                                <div className='Employee-row-field'> {item.endOfContract} </div>
                                <div className='Employee-row-field'> {item.comments} </div>
                                {item.status?<div className='Employee-row-field'>Working</div>:<div className='Employee-row-field'>Former Employee</div>}
                            </button>))}
                            </div> )}

                            {showAddEmployeeDialog ? <AddEmployee OpenClose={openAddEmployeeDialog}/> : null}
                            {showUpdateEmployeeDialog ? <UpdateEmployee OpenClose={openUpdateEmployeeDialog} EmployeeToUpdate={employeeToUpdate}/> : null} 
                    </div>
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>

    );
}
export default Employees