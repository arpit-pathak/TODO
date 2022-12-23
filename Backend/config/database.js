const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log("DB connected with a Success");
      console.log(`connected to DB : ${conn.connection.host}`);
    })
    .catch((error) => {
      console.log("DB connection failed!!");
      console.log(error.message);
      process.exit(1);
    });
};

module.exports = connectToDB;
