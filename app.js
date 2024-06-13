const express = require("express");
const { connectToDB } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const { globalErrorHandler } = require("./middlewares/error.middleware");

// Importing routes
const authRoute = require("./routes/auth.route");
const roleRoute = require("./routes/role.route");
const stateRoute = require("./routes/state.route");
const lgaRoute = require("./routes/lga.route");

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to DB
connectToDB();

// Middlewares

const corOptions = {
  origin: ["https://water-billing-72y7.onrender.com/", "http://localhost:4000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/roles", roleRoute);
app.use("/api/v1/states", stateRoute);
app.use("/api/v1/lgas", lgaRoute);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
