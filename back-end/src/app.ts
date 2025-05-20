import express from "express";
import morgan from "morgan";

import { errorHandler } from "@/middleware/error.middleware";
import { camelCaseMiddleware } from "./middleware/camel-case";
import userRoutes from "@/routes/user.routes";

import authRoutes from "@/routes/auth.routes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(camelCaseMiddleware);


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;