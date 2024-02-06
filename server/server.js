import "dotenv/config";
import express from "express"
import cookieParser from "cookie-parser";
import customError from "./middleware/customError.js";
import helmet from "helmet";
import cors from "cors";
import { limiter } from "./middleware/rateLimit.js";
import connectDatabase from "./config/connectDB.js";


import authRouter from "./routes/auth.routes.js"
// created express app
const app = express();
const PORT = process.env.PORT || 8000;


// adding middleware
// parsing json
app.use(express.json());
// adding extra security http
app.use(helmet());
// cross origin access
app.use(cors());
// parsing cookies
app.use(cookieParser());
// rate limit
app.use(limiter);

// listing Port
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    // Connecting to database
    connectDatabase();
});

// test
app.get("/test", (req, res) => {
    return res.json({ message: "Hello It's working" });
});

// 
app.use("/v1/api/", authRouter);


// Invalid error
app.get('*', (req, res) => {
    res.json({ message: "this url is invalid" });
})

// middle ware for error handling 
app.use(customError);
