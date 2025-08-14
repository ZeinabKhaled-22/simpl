// import module
import mongoose from "mongoose";

// connection
export const connectDB = async () => {
   await mongoose.connect('mongodb://localhost:27017/simpl').then(() => {
        console.log('db is connected successfully');
    }).catch((error) => {
        console.log('fail to connect to db', error);
    })
}
