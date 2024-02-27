import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    }
    catch (e) {
        console.log(`Collection ${collectionName} was missing. skipping drop ...`)
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['users'];
    for (const collectionName of collections) {
        await dropCollection(db, collectionName)
    }
    const [] = await User.create({
            username: 'Misha',
            password: "123",
            token: crypto.randomUUID()
        },
        {
            username: 'Anna',
            password: '0000',
            token: crypto.randomUUID()
        },
        {
            username: 'Ninini',
            password: "123",
            token: crypto.randomUUID()
        }
    );

    await db.close();
};

void run();

