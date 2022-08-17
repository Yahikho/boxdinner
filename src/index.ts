import express from "express";
import dotenv from "dotenv";
import routerCategories from './routes/categoriesRouter'
import routerProducts from './routes/productsRouter'

//Varibles
dotenv.config();
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());

//Routes
app.use(routerCategories)
app.use(routerProducts)

app.listen(PORT, () => {
    console.log( `Server running on port ${PORT}`);
});