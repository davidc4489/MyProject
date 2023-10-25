import React, { useEffect, useState, } from 'react'
import './UpdateDish.css'

function UpdateDish(props) {

    const dishToUpdate = props.DishToUpdate
    const categories = ['Soup', 'Main Course', 'Dessert', 'Drink']
    const [formMode, setFormMode] = useState('edit');
   
    const [updateValues, setUpdateValues] = useState({
        name: dishToUpdate.name,
        category: dishToUpdate.category,
        price:  dishToUpdate.price,
        recipeId: dishToUpdate.recipeId
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
        setFormMode('edit')
    }

    function saveData() {
        props.OpenClose()
        setFormMode('edit')
            fetch(`http://localhost:4000/api/menu/${dishToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteDish() {
        props.OpenClose()
        setFormMode('delete')
        fetch(`http://localhost:4000/api/menu/${dishToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dishToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='UpdateDish-box'>
            <form className='UpdateDish-Box-Content'>
                <div className='UpdateDish-Title'>Update Dish</div>
                <div className='UpdateDish-InputBox'>
                    <label className='UpdateDish-Label'>Name : </label>
                    <input className='UpdateDishPage-Input' type="text" name='name' value={updateValues.name} onChange={updateData} required={formMode === 'edit'} pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateDish-Label'>Category :</label>
                    <select name='category' value={updateValues.category} onChange={updateData} required={formMode === 'edit'} pattern=".*\S+.*" title="This field is required">
                        <option value=''>Choice Category</option>
                        {categories.map((category) => 
                             <option value={category}>{category}</option>
                        )}
                    </select> 
                    <label className='UpdateDish-Label'>Price : </label>
                    <input className='UpdateDishPage-Input' type="number" name='price' value={updateValues.capacity} onChange={updateData} required={formMode === 'edit'} pattern=".*\S+.*" title="This field is required"/>
                    <div>
                </div>

                    <div className='UpdateDish-Buttons'>
                        <button className='UpdateDish-Button' onClick={props.OpenClose}>Cancel</button>
                        <button className='UpdateDish-Button' onClick={deleteDish}>Remove Dish</button>
                        <input type='submit' className='UpdateDish-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateDish