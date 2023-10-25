import React, { useEffect, useState, } from 'react'
import './AddDish.css'

function AddDish(props) {
   
    const categories = ['Soup', 'Main Course', 'Dessert', 'Drink']
    const [addValues, setAddValues] = useState({
        name: '',
        category: '',
        price:  null,
        recipeId: null
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }


    function saveData() {
        props.OpenClose()
            fetch('http://localhost:4000/api/menu/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddDish-box'>
            <form className='AddDish-Box-Content'>
                <div className='AddDish-Title'>Add Dish</div>
                <div className='AddDish-InputBox'>
                    <label className='AddDish-Label'>Name :</label>
                    <input className='AddDishPage-Input' type="text" name='name' value={addValues.name} onChange={updateData} required />
                    <label className='AddDish-Label'>Category :</label>
                    <select name='category' value={addValues.category} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>Choice Category</option>
                        {categories.map((category) => 
                             <option value={category}>{category}</option>
                        )}
                    </select> 
                    <label className='AddDish-Label'>Price :</label>
                    <input className='AddDishPage-Input' type="number" name='price' value={addValues.price} onChange={updateData} required/>
                </div>

                    <div className='AddDish-Buttons'>
                        <button className='AddDish-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type="submit" className='AddDish-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddDish