import './SideBar.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import home_icon from '../../Images/home.png'
import login_icon from '../../Images/login.gif'
import customers_icon from '../../Images/customers.png'
import menu_icon from '../../Images/menu.png'
import stock_icon from '../../Images/stock.png'
import suppliers_icon from '../../Images/suppliers.png'
import tables_icon from '../../Images/tables.png'
import employees_icon from '../../Images/employees.png'
import users_icon from '../../Images/users.png'
import statistics_icon from '../../Images/statistics.gif'
import alert_icon from '../../Images/alert.png'

export default function Sidebar(props) {

    const access = props.access
    const directionAccess = props.directionAccess
    const user = props.user
    const navigate = useNavigate(); 
    const home = '/'
    const login = '/Login'
    const tables = '/Tables/'
    const customers = '/Customers'
    const stock = '/Stock'
    const suppliers = '/Suppliers'
    const employees = '/Employees'
    const menu = '/Menu'
    const users = '/Users'
    const statistics = '/statistics'

    const [dataStock, setDataStock] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [])

    function goToHome() {
        navigate('/', { state: { access, directionAccess, user } });
      }

    function goToLogin() {
        navigate('/Login', { state: { access, directionAccess, user } });
    }

    function goToTables() {
        navigate('/Tables', { state: { access, directionAccess, user } });
      }
    
    function goToCustomers() {
        navigate('/Customers', { state: { access, directionAccess, user } });
    }

    function goToStock() {
        navigate('/Stock', { state: { access, directionAccess, user } });
      }

    function goToSuppliers() {
        navigate('/Suppliers', { state: { access, directionAccess, user } });
    }

    function goToEmployees() {
        navigate('/Employees', { state: { access, directionAccess, user } });
    }

    function goToMenu() {
        navigate('/Menu', { state: { access, directionAccess, user } });
    }

    function goToUsers() {
        navigate('/Users', { state: { access, directionAccess, user } });
    }

    function goToStatistics() {
        navigate('/Statistics', { state: { access, directionAccess, user } });
    }

    const alert = dataStock.find((product) =>  product.quantity < product.minimalQuantity);

    return(
        <div className='SideBar'>
            <div className='SideBar-Logo'>
                <span className='SideBar-Logo-Easy'>Easy </span><span className='SideBar-Logo-Restaurant'>Restaurant</span>
            </div>
            <button onClick={goToHome} className='SideBar-Button'><img className='SideBar-Icon' src={home_icon} /><span className='SideBar-Title'>Home</span></button>
            <button onClick={goToLogin} className='SideBar-Button'><img className='SideBar-Icon' src={login_icon} /><span className='SideBar-Title'>Login/Logout</span></button>
            <button onClick={goToTables} className='SideBar-Button'><img className='SideBar-Icon' src={tables_icon} /><span className='SideBar-Title'>Tables</span></button>
            <button onClick={goToCustomers} className='SideBar-Button'><img className='SideBar-Icon' src={customers_icon} /><span className='SideBar-Title'>Customers</span></button>
            <button onClick={goToMenu} className='SideBar-Button'><img className='SideBar-Icon' src={menu_icon} /><span className='SideBar-Title'>Menu</span></button>
            <button onClick={goToStock} className='SideBar-Button'><img className='SideBar-Icon' src={stock_icon} /><span className='SideBar-Title'>Stock</span>{alert &&<img className='alert-icon' src={alert_icon} />}</button>
            <button onClick={goToSuppliers} className='SideBar-Button'><img className='SideBar-Icon' src={suppliers_icon} /><span className='SideBar-Title'>Suppliers</span></button>
            <button onClick={goToEmployees} className='SideBar-Button'><img className='SideBar-Icon' src={employees_icon} /><span className='SideBar-Title'>Employees</span></button>
            <button onClick={goToUsers} className='SideBar-Button'><img className='SideBar-Icon' src={users_icon} /><span className='SideBar-Title'>Users</span></button>
            {/* <Link to={{pathname: home}} className='SideBar-Button'><img className='SideBar-Icon' src={home_icon} /><span className='SideBar-Title'>Home</span></Link>
            <Link to={{pathname: login}} className='SideBar-Button'><img className='SideBar-Icon' src={login_icon} /><span className='SideBar-Title'>Login</span></Link>
            <Link to={{pathname: tables}} className='SideBar-Button'><img className='SideBar-Icon' src={tables_icon} /><span className='SideBar-Title'>Tables</span></Link>
            <Link to={{pathname: customers}} className='SideBar-Button'><img className='SideBar-Icon' src={customers_icon} /><span className='SideBar-Title'>Customers</span></Link>
            <Link to={{pathname: menu}} className='SideBar-Button'><img className='SideBar-Icon' src={menu_icon} /><span className='SideBar-Title'>Menu</span></Link>
            <Link to={{pathname: stock}} className='SideBar-Button'><img className='SideBar-Icon' src={stock_icon} /><span className='SideBar-Title'>Stock</span>{alert &&<img className='alert-icon' src={alert_icon} />}</Link>
            <Link to={{pathname: suppliers}} className='SideBar-Button'><img className='SideBar-Icon' src={suppliers_icon} /><span className='SideBar-Title'>Suppliers</span></Link>
            <Link to={{pathname: employees}} className='SideBar-Button'><img className='SideBar-Icon' src={employees_icon} /><span className='SideBar-Title'>Employees</span></Link> */}
            <button onClick={goToStatistics} className='SideBar-Button'><img className='SideBar-Icon' src={statistics_icon} /><span className='SideBar-Title'>Statistics</span></button>

        </div>
    )
}