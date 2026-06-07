import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const Password = process.env.Mongo_Db_Password;
const URL = process.env.Mongo_Db_Url.replace("<db_password>", Password);

const connectToDb = async () => {
  try {
    const connected = await mongoose.connect(URL);
    if (connected) {
      console.log("Connected to DB✅😎");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;
