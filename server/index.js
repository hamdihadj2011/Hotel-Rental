const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const FakeDb = require("./fake-db");
const Rental = require("./models/rental");
const User = require("./models/User");
const rentalRoutes = require("./routes/rentals");
const usersRoute = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
const PaymentRoutes = require("./routes/payment");

mongoose.connect(
  config.DB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
      if(process.env.NODE_ENV!=='production'){
          const fakeDb = new FakeDb();
    //  fakeDb.seeDb()
      }
    
    console.log("Mongodb connected ....");
  }
);

app.use(bodyParser.json());
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/payments", PaymentRoutes);
app.use("/api/v1/bookings", bookingRoutes);


if (process.env.NODE_ENV === "production") {
  const appPath = path.join(__dirname, "..", "build");

  app.use(express.static(appPath));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(appPath, "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server Runing on server ${port}`));
