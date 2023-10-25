import  express  from "express";
import cors from "cors" 
import tablesRoutes from './Routes/tables.js'
import customersRoutes from './Routes/customers.js'
import suppliersRoutes from './Routes/suppliers.js'
import employeesRoutes from './Routes/employees.js'
import stockRoutes from './Routes/stock.js'
import menuRoutes from './Routes/menu.js'
import usersRoutes from './Routes/users.js'
import statisticsRoutes from './Routes/statistics.js'
import bodyParser from 'body-parser';

const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use('/api/tables', tablesRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/suppliers', suppliersRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/statistics', statisticsRoutes);

// app.all("*",(req , res ) => res.send("That route doesn't exist"))

app.listen(4000, () =>{
    console.log("server running on port 4000");
});

// Error : SyntaxError: Cannot use import statement outside a module
// Solution : "type": "module" in package.json

// Error : Failed to fetch
// Solution : import cors from "cors"  // app.use(cors());