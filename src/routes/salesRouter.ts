import express from "express";
import {
    cancelSale,
    getSalesDay,
    getSalesBetween,
    salesByCategoryDay,
    salesByCategoryDateBetween,
    lastSale
} from "../controller/salesController";

const routerSales = express.Router();

routerSales.put('/boxdinner/sales/:id', cancelSale);
routerSales.get('/boxdinner/sales', getSalesDay)
routerSales.post('/boxdinner/sales', getSalesBetween)
routerSales.get('/boxdinner/salesbycategory', salesByCategoryDay)
routerSales.post('/boxdinner/salesbycategory', salesByCategoryDateBetween)
routerSales.get('/boxdinner/lastsale', lastSale)

export default routerSales;