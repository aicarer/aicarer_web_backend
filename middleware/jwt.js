import jwt from "jsonwebtoken";
// import User from "../models/User.js";
import Patient from "../models/Patient.js";
import dotenv from 'dotenv';

dotenv.config();

const auth = async(req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
        const user = await Patient.findOne({ _id: data._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized to access this resource' });
    }
}

export default auth;