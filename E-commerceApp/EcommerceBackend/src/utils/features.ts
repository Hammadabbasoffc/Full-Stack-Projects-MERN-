import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/Ecommerce")
    .then((c) => console.log(`DB connected ${c.connection.host}`))
    .catch((e) => console.log(e));
};
