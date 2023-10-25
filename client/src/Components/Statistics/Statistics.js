import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Statistics.css'
import Sidebar from '../SideBar/SideBar.js';

function Statistics() {

    const location = useLocation();
    const access = location.state ? location.state.access : null;
    const directionAccess = location.state ? location.state.directionAccess : null;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataOrders, setDataOrders] = useState([])
    const [category, setCategory] = useState('Menu')
    const [search, setSearch] = useState('')

    function updateSearch(event){
        setSearch(event.target.value)
    }

    let totalDishes = 0
    for (let i = 0; i < dataOrders.length; i++){
        if (dataOrders[i].amount !== null){
        totalDishes += parseInt(dataOrders[i].amount)
        }
    }

    let totalDishesByCategory = {Soup:0, 'Main Course':0, Dessert:0, Drink:0}
    for (let i = 0; i < dataOrders.length; i++){
        if (dataOrders[i].amount !== null){
            if(dataOrders[i].category === 'Soup'){totalDishesByCategory.Soup += parseInt(dataOrders[i].amount)}
            else if(dataOrders[i].category === 'Main Course'){totalDishesByCategory['Main Course'] += parseInt(dataOrders[i].amount)} 
            else if(dataOrders[i].category === 'Dessert'){totalDishesByCategory.Dessert += parseInt(dataOrders[i].amount)} 
            else if(dataOrders[i].category === 'Drink'){totalDishesByCategory.Drink += parseInt(dataOrders[i].amount)} 
        }
    }
    console.log(totalDishesByCategory)

    useEffect(() => {
        fetch(`http://localhost:4000/api/statistics`)
        .then(response => response.json())
        .then(data => setDataOrders(data), console.log(dataOrders))
    }, [])

    return (
        <div className='Statistics'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {(access && directionAccess)?
            <div>

                <div className='StatisticsPage-Buttons'>
                    <button className='StatisticsPage-Button' onClick={() => setCategory('Menu')}>Menu</button>
                    <button className='StatisticsPage-Button' onClick={() => setCategory('Soup')}>Soups</button>
                    <button className='StatisticsPage-Button' onClick={() => setCategory('Main Course')}>Main Course</button>
                    <button className='StatisticsPage-Button' onClick={() => setCategory('Dessert')}>Desserts</button>
                    <button className='StatisticsPage-Button' onClick={() => setCategory('Drink')}>Drinks</button>
                </div>
                <div className='Statistics-TitlePage'>{category}</div>

                <div className='MenuPage-SearchBox'>
                    <input type='text' className='MenuPage-SearchBox-Input' placeholder='Search Dish by Name' value={search} onChange={updateSearch}></input>
                </div>

                {dataOrders.length &&
                    <div>
                        <div className='Statistics-Headers'>
                            <div> Name </div>
                            <div> Category </div>
                            <div> Amount </div>
                            <div> By Percent </div>
                            <div> By Percent for Category</div>
                        </div>
                        <div className='StatisticsTable'>
                            <div>
                            {dataOrders.map((item) => (
                                ((category === 'Menu' || category == item.category) && (item.name.includes(search))) &&
                            <div key={item.id} className='Statistics-DishRow'>
                                    <div className='row-field'> {item.name} </div>
                                    <div className='row-field'> {item.category} </div>
                                    {item.amount !== null ? <div className='row-field'> {item.amount} </div>:<div className='row-field'> 0 </div>}
                                    <div className='row-field'> {Math.round((item.amount/totalDishes)*10000)/100} </div>
                                    {totalDishesByCategory[item.category] !== 0 ?
                                    <div className='row-field'> {Math.round((item.amount/totalDishesByCategory[item.category])*10000)/100} </div>:
                                    <div className='row-field'> No Order for this Category </div>}
                            </div>
                            ))}
                            </div>
                        </div>
                                               
                    </div>}
                </div>:<div className='NoAccessUsersAlert'>To access the data please login with management permission</div>}
        </div>
    );
}
export default Statistics