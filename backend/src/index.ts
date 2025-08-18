import express, { Express, Request, Response } from "express";
import { config } from "./config/env";
import productRouter from "./modules/product/product.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";

const PORT = config.PORT;
const BASE_URL = config.BASE_URL; // should be "/api/v1", not a full URL

const app: Express = express();

// CORS options
const corsOptions = {
    origin: config.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(`${BASE_URL}/product`, productRouter);

app.get(`${BASE_URL}/health`, (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "API is healthy!",
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}${BASE_URL}`);
});
