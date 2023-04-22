const express = require("express");
const { errorHandler } = require("./middleWare/errorMiddleware");
const connectDB = require("./config/db.js");
require("dotenv").config();
require("colors");
const port = process.env.PORT || 5000;
const app = express();
//connect to mongodb database
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//post endpoints
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/add/goal", require("./routes/goalRoutes"));
app.use("/api/update/goal", require("./routes/goalRoutes"));
app.use("/api/delete/goal", require("./routes/goalRoutes"));
//user endpoint
app.use("/api/users", require("./routes/userRoutes"));


app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
