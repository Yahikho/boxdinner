import express from "express";
import { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    getProductCode
} from "../controller/productsController";

const routerProducts = express.Router();

routerProducts.get('/boxdinner/products', getProducts);
routerProducts.get('/boxdinner/products/:id', getProduct)
routerProducts.get('/boxdinner/productscode/:code', getProductCode)
routerProducts.post('/boxdinner/products', createProduct)
routerProducts.put('/boxdinner/products/:id', updateProduct)

export default routerProducts;