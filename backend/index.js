import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

const app = express();
dotenv.config({});
const corsOptions = {
    origin:"https://ai-powered-job-portal.onrender.com",
    credentials:true
}

app.use(cors(corsOptions));
const _dirname = path.resolve()

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static(path.join(_dirname , "/frontend/dist")));
// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get('*' ,  (_ , res) => {
    res.sendFile(path.resolve(_dirname , "frontend" , "dist" , "index.html"))
});

app.use(cors(corsOptions));

const PORT = process.env.PORT || 8001;




app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})