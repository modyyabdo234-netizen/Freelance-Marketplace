import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import GigRouter from "./routes/gigs.routes";
import orderRoutes from "./routes/orderRoutes";
import dashboardRoutes from "./routes/Order.Dashboard.routes";
import cors from 'cors';
const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
dotenv.config();



app.use(cookieParser());
app.use(express.json());


// Routes
app.use("/auth", authRoutes);

app.use("/freelance", GigRouter);

app.use("/orders", orderRoutes);

app.use("/dashboard", dashboardRoutes);


mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    })
    .catch((error) => {

        console.error("MongoDB connection failed:", error);

    });


// POST http://localhost:3000/auth/register
// POST http://localhost:3000/auth/login
// GET    http://localhost:3000/freelance/gig
// GET    http://localhost:3000/freelance/gig/search
// POST   http://localhost:3000/freelance/gig
// PATCH  http://localhost:3000/freelance/gig/:id
// DELETE http://localhost:3000/freelance/gig/:id
// PATCH  http://localhost:3000/freelance/gig/favorite/:id
// POST  http://localhost:3000/orders
// GET   http://localhost:3000/orders
// PATCH http://localhost:3000/orders/:id/status

// curl http://localhost:3000/freelance/gig