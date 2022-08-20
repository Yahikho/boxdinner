import express from "express";
import {
    createProductsOnSales,
    cancelProduct
} from "../controller/productsOnSalesController";

const routerProductsOnSales = express.Router();

routerProductsOnSales.get('/boxdinner/productsonsales', createProductsOnSales);
routerProductsOnSales.get('/boxdinner/productsonsales/:id', createProductsOnSales)
routerProductsOnSales.post('/boxdinner/productsonsales', createProductsOnSales)
routerProductsOnSales.put('/boxdinner/productsonsales/:id', cancelProduct)

export default routerProductsOnSales;