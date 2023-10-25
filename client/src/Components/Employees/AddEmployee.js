import React, { useEffect, useState, } from 'react'
import './AddEmployee.css'

function AddEmployee(props) {

    const categories = ['Kitchen Worker', 'Waiter', 'Other']
   
    const [addValues, setAddValues] = useState({
        name: '',
        jobCategory: '',
        job: '',
        status: true,
        salary: '',
        startOfContract: '',
        endOfContract: '',
        comments: ''
    });

    function updateData(event) {
        setAddValues({
            ...addValues,
            [event.target.name]: event.target.value
        })
    }

    function saveData() {
        props.OpenClose()
            fetch('http://localhost:4000/api/employee/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addValues),
            })
                .then(response => {response.json()
    })}

    return (
        <div className='AddEmployee-box'>
            <form className='AddEmployee-Box-Content'>
                <div className='AddEmployee-Title'>Add Employee</div>
                <div className='AddEmployee-InputBox'>
                    <label className='AddEmployee-Label'>Name :</label>
                    <input className='AddEmployeePage-Input' type="text" name='name' value={addValues.name} onChange={updateData} required /> 
                    <label className='AddEmployee-Label'>Job Category :</label>
                    <select name='jobCategory' value={addValues.jobCategory} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>Choice Job Category</option>
                        {categories.map((category) => 
                             <option value={category}>{category}</option>
                        )}
                    </select> 
                    <label className='AddEmployee-Label'>Job :</label>
                    <input className='AddEmployeePage-Input' type="text" name='job' value={addValues.job} onChange={updateData} required /> 
                    <label className='AddEmployee-Label'>Status :</label>
                    <select name='status' value={addValues.status} onChange={updateData} required pattern=".*\S+.*" title="This field is required"> 
                        <option value={true}>Working</option>                       
                        <option value={false}>Former Employee</option>                                          
                     </select>
                    <label className='AddEmployee-Label'>Salary :</label>
                    <input className='AddEmployeePage-Input' type="number" name='salary' value={addValues.salary} onChange={updateData} required /> 
                    <label className='AddEmployee-Label'>Start of Contract :</label>
                    <input className='AddEmployeePage-Input' type="date" name='startOfContract' value={addValues.startOfContract} onChange={updateData} required /> 
                    <label className='AddEmployee-Label'>End of Contract :</label>
                    <input className='AddEmployeePage-Input' type="date" name='endOfContract' value={addValues.endOfContract} onChange={updateData} required/>
                    <label className='AddEmployee-Label'>Comments :</label>
                    <textarea className='AddEmployeePage-Input' name='comments' value={addValues.comments} onChange={updateData}/>
                </div>

                    <div className='AddEmployee-Buttons'>
                        <button className='AddEmployee-Button' onClick={props.OpenClose}>Cancel</button>
                        <input type="submit" className='AddEmployee-Button' onClick={saveData}></input>
                    </div>
            </form>
        </div>
    )
}

export default AddEmployee