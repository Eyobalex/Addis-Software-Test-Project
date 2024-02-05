import mongoose from "mongoose";




async function connect(){
    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();

    // mongoose.set('strictQuery');

    const db = mongoose.connect(process.env.MONGO_URL);
    console.log(`database connected successfully`);

    return db;
}

export default connect;