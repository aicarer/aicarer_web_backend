import mongoose from "mongoose";
import dotenv from 'dotenv';

// dotenv.config();

// const url = process.env.MONGO_URL;
// const dbase = process.env.MONGODB_DB;
// const user_db = process.env.MONGODB_USER;
// const pass_db = process.env.MONGODB_PASS;

// mongoose.connect(`${url}/${dbase}`,{
//     authSource: 'admin',
//     user: `${user_db}`,
//     pass: `${pass_db}`,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// const dbConn = mongoose.connection;
// dbConn.on('error', (error)=> console.error(error));
// dbConn.once('open', () => console.log('Database Connected'));

// export default dbConn;