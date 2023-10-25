import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Stock.css'
import Sidebar from '../SideBar/SideBar.js';
import AddProduct from './AddProduct.js';
import UpdateProduct from './UpdateProduct.js';

function Stock() {

    const location = useLocation();
    const access = location.state ? location.state.access : null;
    const directionAccess = location.state ? location.state.directionAccess : null;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    const [dataStock, setDataStock] = useState([])
    const [category, setCategory] = useState('All Products')
    const [productToUpdate, setProductToUpdate] = useState(null)
    const [search, setSearch] = useState('')

    const [showAddProductDialog, setShowAddProductDialog] = useState(false)
    const [showUpdateProductDialog, setShowUpdateProductDialog] = useState(false)

    function openAddProductDialog (){
        setShowAddProductDialog(!showAddProductDialog)
    }

    function openUpdateProductDialog (){
        setShowUpdateProductDialog(!showUpdateProductDialog)
    }

    function updateProduct(item){
        setShowUpdateProductDialog(true)
        setProductToUpdate(item)
    }

    function updateSearch(event){
        setSearch(event.target.value)
    }

    useEffect(() => {
        fetch(`http://localhost:4000/api/stock`)
        .then(response => response.json())
        .then(data => setDataStock(data))
    }, [dataStock])


    return (
        <div className='Stock'>
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            {access?
            <div>
                <div className='StockPage-Buttons'>
                    <button className='StockPage-Button' onClick={() => setCategory('All Products')}>All Products</button>
                    <button className='StockPage-Button' onClick={() => setCategory('Food')}>Food</button>
                    <button className='StockPage-Button' onClick={() => setCategory('Delivering Material')}>Delivering Material</button>
                    <button className='StockPage-Button' onClick={() => setCategory('Maintenance Material')}>Maintenance Material</button>
                    <button className='StockPage-Button' onClick={() => setCategory('Kitchen Material')}>Kitchen Material</button>
                    <button className='StockPage-AddProduct-Button' onClick={() => setShowAddProductDialog(true)}>Add Product</button>
                </div>
                <div className='Stock-TitlePage'>{category}</div>
                <div className='StockPage-SearchBox'>
                    <input type='text' className='StockPage-SearchBox-Input' placeholder='Search Product by Name' value={search} onChange={updateSearch}></input>
                </div>
                {dataStock.length &&
                    <div>
                        <div className='Stock-Headers'>
                            <div className='Stock-Header'> Id </div>
                            <div className='Stock-Header'> Product Name </div>
                            <div className='Stock-Header'> Category </div>
                            <div className='Stock-Header'> Supplier </div>
                            <div className='Stock-Header'> Product Brand </div>
                            <div className='Stock-Header'> Quantity </div>
                            <div className='Stock-Header'> Unity </div>
                            <div className='Stock-Header'> Minimal Quantity </div>
                        </div>
                            {dataStock.map((item) => (
                                ((category === 'All Products' || category === item.category) && (item.productName.includes(search)))&&
                            <button key={item.id} className='Stock-ProductRow' onClick={() => updateProduct(item)}>
                                <div className='Stock-row-field'> {item.id} </div>
                                <div className='Stock-row-field'> {item.productName} </div>
                                <div className='Stock-row-field'> {item.category} </div>
                                <div className='Stock-row-field'> {item.supplier} </div>
                                <div className='Stock-row-field'> {item.productBrand} </div>
                                {item.quantity>=item.minimalQuantity &&<div className='Stock-row-field'> {item.quantity} </div>}
                                {item.quantity<item.minimalQuantity &&<div className='Stock-row-field-Alert'> {item.quantity} </div>}
                                <div className='Stock-row-field'> {item.unity} </div>
                                <div className='Stock-row-field'> {item.minimalQuantity} </div>
                            </button>))}

                            {showAddProductDialog ? <AddProduct OpenClose={openAddProductDialog}/> : null}
                            {showUpdateProductDialog ? <UpdateProduct OpenClose={openUpdateProductDialog} ProductToUpdate={productToUpdate}/> : null}   
                    </div>}
                </div>:<div className='NoAccessAlert'>To access the data please login</div>}
        </div>

    );
}
export default Stock