import React, { useEffect, useState } from 'react'
import './Bill.css'

function Bill(props) {
    const customer = props.CustomerToUpdate
    const [dataCustomerBill, setDataCustomerBill] = useState()

    const [updateValues, setUpdateValues] = useState({
        name: customer.name,
        size: customer.size,
        status: 'Done',
        tableId: customer.tableId
    });

    useEffect(() => {
        fetch(`http://localhost:4000/api/customers/${customer.id}`)
        .then(response => response.json())
        .then(data => setDataCustomerBill(data),)
    }, [])
    
    let TotalBill = 0
    const billItems = dataCustomerBill?.map((item, index) => {
        const name = Object.keys(item)[0]; // Extract the key
        const amount = item[name]; // Extract the value
        const TotalPriceKey = Object.keys(item)[1];
        const TotalPrice = item[TotalPriceKey];
        TotalBill += TotalPrice

        return (
            <div className='BillItem' key={index}>
                <div className='BillItem-Case'>{name} :</div>
                <div className='BillItem-Case'>Amount : {amount}</div>
                <div className='BillItem-Case'>Total Price :</div>
                <div className='BillItem-Case'>{TotalPrice} $</div>
            </div>
        );
    });

    function saveData() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/customers/${customer.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateValues),
        })
            .then(response => {response.json()},
            props.OpenClose())
}

    return (
        <div className='BillBox'>
            <div className='BillBox-Content'>
        <div>
            {billItems}
            <div className='BillBox-TotalBill'>
                <div></div><div></div>
                <div className='BillBox-TotalBill-Text'>Total Bill :</div> 
                <div className='BillBox-TotalBill-Text'>{TotalBill} $</div>
            </div>
        </div>
        <div className='CustomerBill-Buttons'>
                        <button className='CustomerBill-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type='submit' value='Payed' className='CustomerBill-Button' onClick={saveData}></input>
        </div>
        </div>
        </div>        
    )
}

export default Bill