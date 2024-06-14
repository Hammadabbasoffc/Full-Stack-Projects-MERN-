import express from 'express'
import { adminOnly } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';
import { getAdminProducts, getAllCategories, getlatestProducts, newProduct } from '../controllers/product.js';

const app = express.Router();

app.post('/new',adminOnly, singleUpload, newProduct);

app.get("/latest",getlatestProducts);

app.get("/categories",getAllCategories);

app.get("/admin-products",getAdminProducts);

export default app