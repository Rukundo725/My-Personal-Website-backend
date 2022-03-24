import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoute from "./Routers/Auth";
import connectDb from './dbConn';
import blogRoute from "./Routers/blog";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


const app = express();
const port = process.env.PORT ||4000;

// Connect to MongoDB
connectDb();
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen( port, () => console.log(`Server running on port ${port}`));
});



//swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Express API for My Blog Articles",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
  };
   
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ["./Routers/blog.js"],
    
  };
  
  const swaggerSpec = swaggerJSDoc(options);

// middleware 
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/user', authRoute);
app.use('/api/blog', blogRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;

