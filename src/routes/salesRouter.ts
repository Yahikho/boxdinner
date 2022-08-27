import express from "express";
import {
    cancelSale,
} from "../controller/salesController";

const routerSales = express.Router();

routerSales.put('/boxdinner/sales/:id', cancelSale);

export default routerSales;