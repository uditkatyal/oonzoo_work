const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DataBase connected Successfully");
  } catch (err) {
    console.log(`DataBase failed to connect`);
  }
};
module.exports = connectDB;
