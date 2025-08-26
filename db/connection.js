// import module
import mongoose from "mongoose";

// connection
export const connectDB = async () => {
   await mongoose.connect(process.env.DB_URL).then(() => {
        console.log('db is connected successfully');
    }).catch((error) => {
        console.log('fail to connect to db', error);
    })
}
