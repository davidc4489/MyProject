import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './App.css'
import Home from './Components/Home/Home.js';
import Tables from './Components/Tables/Tables.js';
import Customers from './Components/Customers/Customers.js';
import Stock from './Components/Stock/Stock.js';
import Suppliers from './Components/Suppliers/Suppliers.js';
import Employees from './Components/Employees/Employees.js';
import Menu from "./Components/Menu/Menu.js";
import Login from "./Components/Login/Login.js";
import Users from "./Components/Users/Users.js";
import Statistics from "./Components/Statistics/Statistics.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Tables' element={<Tables/>} />
          <Route path='/Customers' element={<Customers/>} />
          <Route path='/Stock' element={<Stock/>} />
          <Route path='/Suppliers' element={<Suppliers/>} />
          <Route path='/Employees' element={<Employees/>} />
          <Route path='/Menu' element={<Menu/>} />
          <Route path='/Users' element={<Users/>} />
          <Route path='/Statistics' element={<Statistics/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
