import mongoose from "mongoose";




 function  connect(){
    const db =  mongoose.connect(process.env.MONGO_URL);
    // console.log(`database connected successfully`);
    return db;
}

export default connect;