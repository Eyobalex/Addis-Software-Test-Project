import mongoose from "mongoose";




 function  connect(){
    console.log("🚀 ~ connect ~ process.env.MONGO_URL:", process.env.MONGO_URL)
    const db =  mongoose.connect(process.env.MONGO_URL);
    // console.log(`database connected successfully`);
    return db;
}

export default connect;