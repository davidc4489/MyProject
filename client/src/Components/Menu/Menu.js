import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Menu.css'
import Sidebar from '../SideBar/SideBar.js';
import AddDish from './AddDish.js';
import UpdateDish from './UpdateDish.js';

function Menu() {

    const location = useLocation();
    const access = location.state ? location.state.access : false;
    const directionAccess = location.state ? location.state.directionAccess : false;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataMenu, setDataMenu] = useState([])
    const [category, setCategory] = useState('Menu')
    const [dishToUpdate, setDishToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddDishDialog, setShowAddDishDialog] = useState(false)
    const [showUpdateDishDialog, setShowUpdateDishDialog] = useState(false)

    function updateSearch(event){
        setSearch(event.target.value)
    }

    function openAddDishDialog (){
        setShowAddDishDialog(!showAddDishDialog)
    }

    function openUpdateDishDialog (){
        setShowUpdateDishDialog(!showUpdateDishDialog)
    }

    function updateDish(item){
        setShowUpdateDishDialog(true)
        setDishToUpdate(item)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/menu`)
        .then(response => response.json())
        .then(data => setDataMenu(data))
    }, [dataMenu])

    return (
        <div className='Menu'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access?
            <div>
                <div className='MenuPage-Buttons'>
                    <button className='MenuPage-Button' onClick={() => setCategory('Menu')}>Menu</button>
                    <button className='MenuPage-Button' onClick={() => setCategory('Soup')}>Soups</button>
                    <button className='MenuPage-Button' onClick={() => setCategory('Main Course')}>Main Course</button>
                    <button className='MenuPage-Button' onClick={() => setCategory('Dessert')}>Desserts</button>
                    <button className='MenuPage-Button' onClick={() => setCategory('Drink')}>Drinks</button>
                    <button className='MenuPage-AddDish-Button' onClick={() => setShowAddDishDialog(true)}>Add Dish</button>
                </div>
                <div className='Menu-TitlePage'>{category}</div>

                <div className='MenuPage-SearchBox'>
                    <input type='text' className='MenuPage-SearchBox-Input' placeholder='Search Dish by Name' value={search} onChange={updateSearch}></input>
                </div>

                {dataMenu.length &&
                    <div>
                        <div className='Menu-Headers'>
                            <div className='Menu-Header'> Id </div>
                            <div className='Menu-Header'> Name </div>
                            <div className='Menu-Header'> Category </div>
                            <div className='Menu-Header'> Price </div>
                            <div className='Menu-Header'> Recipe Id </div>
                        </div>
                            {dataMenu.map((item) => (
                                ((category === 'Menu' || category == item.category) && (item.name.includes(search))) &&
                            <button key={item.id} className='Menu-DishRow' onClick={() => updateDish(item)}>
                                    <div className='Dish-row-field'> {item.id} </div>
                                    <div className='Dish-row-field'> {item.name} </div>
                                    <div className='Dish-row-field'> {item.category} </div>
                                    <div className='Dish-row-field'> {item.price} </div>
                                    <div className='Dish-row-field'> {item.recipeId} </div>
                            </button>
                            ))}

                            {showAddDishDialog ? <AddDish OpenClose={openAddDishDialog}/> : null}
                            {showUpdateDishDialog ? <UpdateDish OpenClose={openUpdateDishDialog} DishToUpdate={dishToUpdate}/> : null}                 
                    </div>}
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>
    );
}
export default Menu