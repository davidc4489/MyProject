import React, { useEffect, useState } from 'react'
import './Order.css'

function Order(props) {
    const customer = props.CustomerToUpdate
    const [dataMenu, setDataMenu] = useState([])
    const categories = ['Soup', 'Main Course', 'Dessert', 'Drink']
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/api/menu`)
        .then(response => response.json())
        .then(data => setDataMenu(data))
    }, [])

    function addInput(category, itemId, itemCat, amount) {
        let updatedItems = [...selectedItems];
        const selectedItemIndex = updatedItems.findIndex((item) => item.itemId === itemId);
    
        if (selectedItemIndex !== -1) {
          updatedItems[selectedItemIndex].amount += amount;
          updatedItems[selectedItemIndex].category = itemCat
        } else {
          updatedItems.push({ itemId, itemCat, amount });
        }
        setSelectedItems(updatedItems);
      }

      function removeInput(category, itemId, itemCat, amount) {
        const updatedItems = [...selectedItems];
        const selectedItemIndex = updatedItems.findIndex((item) => item.itemId === itemId);
    
        if (selectedItemIndex !== -1) {
          updatedItems[selectedItemIndex].amount -= amount;
          } else {
            updatedItems.push({ itemId, itemCat, amount: -amount });
          }
          setSelectedItems(updatedItems);
      }
    
      function renderCategoryInputs(category) {
        return dataMenu
          .filter((item) => item.category === category)
          .map((item) => {
            const selectedItem = selectedItems.find((selected) => selected.itemId === item.id);
            const amount = selectedItem ? selectedItem.amount : 0;
    
            return (
              <div className='OrderItem-Row'key={item.id}>
                <label className='OrderItem'>{item.name}: </label>
                <button className='OrderItem' onClick={() => addInput(category, item.id, item.category, 1)}>+</button>
                <span className='OrderItem'>{amount}</span>
                <button onClick={() => removeInput(category, item.id, item.category, 1)}>-</button>
                </div>
            );
          });
      }

    function saveData() {
      props.OpenClose()
        fetch(`http://localhost:4000/api/customers/OrdersList/${customer.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedItems),
        })
            .then(response => {response.json()},
            props.OpenClose())
    }

    return (
        <div className='BillBox'>
            <div className='OrderBox-Content'>
          {categories.map((category) => (
          <div key={category}>
            <label className='OrderCustomer-Label'>{category}: </label>
            {renderCategoryInputs(category)}
          </div>
        ))}
        <div className='CustomerBill-Buttons'>
            <button className='CustomerBill-Button' onClick={props.OpenClose}>Cancel</button>
            <input type='submit' value='Order' className='CustomerBill-Button' onClick={saveData}></input>
        </div>
        </div>
        </div>        
    )
}

export default Order