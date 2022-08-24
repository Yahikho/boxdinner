import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerCategories from './routes/categoriesRouter';
import routerProducts from './routes/productsRouter';
import routerSales from './routes/salesRouter';
import routerProductsOnSales from './routes/productsOnSalesRouter';

//Varibles
dotenv.config();
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors({
    origin: "*"
}))


//Routes
app.use(routerCategories);
app.use(routerProducts);
app.use(routerSales);
app.use(routerProductsOnSales);

app.listen(PORT, () => {
    console.log( `Server running on port ${PORT}`);
});