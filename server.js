const express =  require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors  = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const { errorLogger, requestLogger } = require("./utils/logger");

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Cross-Origin Resource Sharing
app.use(express.json()); // Body parser
// app.use(morgan("combined", { stream: requestLogger() })); // Logging HTTP requests
app.use(requestLogger) // Logging HTTP requests


// Rate limiter to prevent DDOS attacks
const limiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100, // Limit each IP to 100 requests per windowMs
   message: "Too many requests from this IP, please try again later.",
 });

app.use(limiter);

// // Connect to MongoDB
(async () => {
   try {
    //  await mongoose.connect(process.env.MONGODB_URI, {
    //    useNewUrlParser: true,
    //    useUnifiedTopology: true,
    //  });
    const res =  await mongoose.connect(process.env.MONGODB_URI)
    // Access the connection and get the db name
    const dbName = res.connection.name;
    //  console.log("Connected to MongoDB", dbName);


     // Use the admin() method to get a list of databases
    //  const admin = res.connection.db.admin();
    //  const { databases } = await admin.listDatabases();
     
    //  console.log('Databases in your cluster:');
    //  databases.forEach(db => console.log(db.name)); // List each database name
 
    //  console.log(`Total databases: ${databases.length}`);
     console.log(`Connection Successfully with this Database ===> : ${dbName}`);

   } catch (error) {
     console.error("MongoDB connection error:", error);
     process.exit(1);
   }
 })();

//  // Example API routes
// const userRoutes = require("./api/user");
// const adminRoutes = require("./api/admin");

// // app.use("/api/user", userRoutes);
// // app.use("/api/admin", adminRoutes);

// 404 Handler
app.use((req, res, next) => {
   res.status(404).json({ message: "Route not found" });
 });

 
// Error Handler
app.use((err, req, res, next) => {
   errorLogger(err); // Log the error
   res.status(500).json({ message: "Internal Server Error" });
 });


app.get("/",(req,res)=>{
   return res.send("Secure Express Server is running")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
   console.log(`Server is running on Port ===> ${PORT}`)
})

module.exports = app;