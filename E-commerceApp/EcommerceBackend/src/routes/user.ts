import express from 'express'
import { newUser , getAllUsers,getUser, deleteUser} from '../controllers/user.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

// route - /api/v1/user/new
app.post('/new',newUser);

app.get("/all", getAllUsers);

app.get("/:id",adminOnly, getUser);

app.delete("/:id",adminOnly,deleteUser)

export default app