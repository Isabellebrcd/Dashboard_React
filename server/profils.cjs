const { MongoClient, ObjectId } = require('mongodb');
const mongoURI = 'mongodb+srv://***:***@cluster0.gp24g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURI);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connecté à MongoDB');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
    }
}

connectToDatabase();

async function getProfils() {
    const db = client.db('Dashboard');
    return await db.collection('User').find().toArray();
}

async function getMeasure() {
    const db = client.db('Dashboard');
    return await db.collection('Measure').find().toArray();
}

module.exports = {
    getProfils,getMeasure,
};
