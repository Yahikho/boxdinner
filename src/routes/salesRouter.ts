import express from "express";
import {
    cancelSale
} from "../controller/salesController";

const routerSales = express.Router();

routerSales.get('/boxdinner/sales', cancelSale);
routerSales.get('/boxdinner/sales/:id', cancelSale)
routerSales.post('/boxdinner/sales', cancelSale)
routerSales.put('/boxdinner/sales/:id', cancelSale)

export default routerSales;