import React, { useEffect, useState, } from 'react'
import './UpdateEmployee.css'

function UpdateEmployee(props) {

    const employeeToUpdate = props.EmployeeToUpdate

    const categories = ['Kitchen Worker', 'Waiter', 'Other']
   
    const [updateValues, setUpdateValues] = useState({
        name: employeeToUpdate.name,
        jobCategory: employeeToUpdate.jobCategory,
        job: employeeToUpdate.job,
        status: true,
        salary: employeeToUpdate.salary,
        startOfContract: employeeToUpdate.startOfContract,
        endOfContract: employeeToUpdate.endOfContract,
        comments: employeeToUpdate.comments
    });

    function updateData(event) {
        setUpdateValues({
            ...updateValues,
            [event.target.name]: event.target.value,
        })
    }

    function saveData() {
        props.OpenClose()
            fetch(`http://localhost:4000/api/employees/${employeeToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateValues),
            })
                .then(response => {response.json()})
    }

    function deleteEmployee() {
        props.OpenClose()
        fetch(`http://localhost:4000/api/employees/${employeeToUpdate.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeToUpdate),
        })
            .then(response => {response.json()})
}

    return (
        <div className='UpdateEmployee-box'>
            <form className='UpdateEmployee-Box-Content'>
                <div className='UpdateEmployee-Title'>Update Supplier</div>
                <div className='UpdateEmployee-InputBox'>
                <label className='UpdateEmployee-Label'>Name: </label>
                    <input className='UpdateEmployeePage-Input' type="text" name='name' value={updateValues.name} onChange={updateData} required /> 
                    <label className='UpdateEmployee-Label'>Job Category :</label>
                    <select name='jobCategory' value={updateValues.jobCategory} onChange={updateData} required pattern=".*\S+.*" title="This field is required">
                        <option value=''>Choice Job Category</option>
                        {categories.map((category) => 
                             <option value={category}>{category}</option>
                        )}
                    </select> 
                    <label className='UpdateEmployee-Label'>Job :</label>
                    <input className='UpdateEmployeePage-Input' type="text" name='job' value={updateValues.job} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateEmployee-Label'>Status :</label>
                    <select name='status' value={updateValues.status} onChange={updateData} required pattern=".*\S+.*" title="This field is required"> 
                        <option value={true}>Working</option> 
                        <option value={false}>Former Employee</option>                                          
                     </select>
                    <label className='UpdateEmployee-Label'>Salary :</label>
                    <input className='UpdateEmployeePage-Input' type="number" name='salary' value={updateValues.salary} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateEmployee-Label'>Start of Contract :</label>
                    <input className='UpdateEmployeePage-Input' type="date" name='startOfContract' value={updateValues.startOfContract} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/> 
                    <label className='UpdateEmployee-Label'>End of Contract :</label>
                    <input className='UpdateEmployeePage-Input' type="date" name='endOfContract' value={updateValues.endOfContract} onChange={updateData} required pattern=".*\S+.*" title="This field is required"/>
                    <label className='UpdateEmployee-Label'>Comments :</label>
                    <textarea className='UpdateEmployeePage-Input' name='comments' value={updateValues.comments} onChange={updateData}/>
                    
                    <div className='UpdateEmployee-Buttons'>
                        <button className='UpdateEmployee-Button' onClick={props.OpenClose}>Cancel</button>
                        <button className='UpdateEmployee-Button' onClick={deleteEmployee}>Remove Employee</button>
                        <input type='submit' className='UpdateEmployee-Button' onClick={saveData}></input>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UpdateEmployee