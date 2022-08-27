import express from "express";
import { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    getProductCode,
    productsByCodeOrName
} from "../controller/productsController";

const routerProducts = express.Router();

routerProducts.get('/boxdinner/products', getProducts);
routerProducts.get('/boxdinner/products/:id', getProduct)
routerProducts.get('/boxdinner/productscode/:code', getProductCode)
routerProducts.post('/boxdinner/products', createProduct)
routerProducts.put('/boxdinner/products/:id', updateProduct)
routerProducts.post('/boxdinner/productsNameCode',productsByCodeOrName)

export default routerProducts;