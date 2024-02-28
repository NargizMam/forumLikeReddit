import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";

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
    const collections = ['users', 'posts'];
    for (const collectionName of collections) {
        await dropCollection(db, collectionName)
    }
    const [user1, user2, user3] = await User.create({
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
    const [post1, post2] = await Post.create(
        {
            user: user1.id,
            image: 'fixtures/yamakasi.jpeg',
            title: 'Task1',
            description: ' Если в выдаче с сервера будет подобная конфиденциальная информация, за это будут сняты баллы! Вы можете воспользоваться дополнительным аргументом к методу populate(), чтобы ограничить поля, которые будут возвращены.',
        },
        {
            user: user2.id,
            image: 'fixtures/zima.jpeg',
            title: 'Angel music',
            description: 'Música Angelical Para Atraer Ángeles - Sanar Todo Daño del Cuerpo, del Alma y del Espíritu,',
        },
    )

    await db.close();
};

void run();

