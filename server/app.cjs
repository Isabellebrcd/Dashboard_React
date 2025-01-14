const express = require('express');
const expressMongoSanitize = require('express-mongo-sanitize'); // Pour éviter les attaques par injection
const helmet = require('helmet'); // Pour sécuriser les en-têtes HTTP
const bodyParser = require('body-parser');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware pour la sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(expressMongoSanitize());
// Connexion à la base de données
const mongoURI = 'mongodb+srv://***:***@cluster0.gp24g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connecté à MongoDB');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
    }
}

connectToDatabase();
app.get('/admin-getprofils', async (req, res) => {
    const db = client.db('Dashboard');
    const collection = db.collection('User');
    try {
        const user = await collection.find().toArray();
        const results = await Promise.all(user.map(async (user) => {
            try {
                if (user) {
                    const {_id: userID, houseSize, personsInHouse, location} = user;
                    return {userID, houseSize, personsInHouse, location};
                } else {
                    // Échec de la connexion
                    res.status(401).json({success: false, message: 'Pas de personne trouvée'});
                }
            } catch (error) {
                console.error('Erreur lors de la vérification des informations des capteurs :', error);
                res.status(500).json({success: false, message: 'Erreur serveur'});
            }
        }));
        await res.json({success: true, tabs: results});
    } catch (error) {
        console.error('Erreur lors de la vérification des informations d\'identification :', error);
        res.status(500).json({success: false, message: 'Erreur serveur'});
    }
});


app.post('/profils', async (req, res) => {
    const {email, pswd} = req.body;
    let password = pswd;
    // Utilisation de la base de données pour vérifier les informations d'identification
    const db = client.db('Dashboard');
    const collection = db.collection('User');
    try {
        const user = await collection.findOne({email, password});
        if (user) {
            const {email, password, role, _id : userID, location} = user;
            // Connexion réussie, ne renvoyez pas de données sensibles
            res.status(200).json({
                success: true,
                message: 'Connexion réussie',
                user: {email, password, role, userID, location}
            });
        } else {
            // Échec de la connexion
            res.status(401).json({success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect'});
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des informations d\'identification :', error);
        res.status(500).json({success: false, message: 'Erreur serveur'});
    }
});
app.post('/client/sensors', async (req, res) => {
    const {email, pswd, type} = req.body;
    let password = pswd;
    let typePost = type;

    // Utilisation de la base de données pour vérifier les informations d'identification
    const db = client.db('Dashboard');
    const userC = db.collection('User');
    try {
        const user = await userC.findOne({email, password});
        const sensorC = db.collection('Sensor');
        console.log(user);
        if (user) {
            const {_id} = user;
            const sensorData = await sensorC.find({userID: _id}).toArray();
            const MeasureC = db.collection('Measure');
            // Utilisation de map pour traiter chaque document de manière asynchrone
            const results = await Promise.all(sensorData.map(async (sensor) => {
                // Process each document here
                //console.log(sensor);
                try {
                    if (sensor) {
                        const {_id: sensorId, creationDate: sensorDate, location, userID} = sensor;
                        const MeasureData = await MeasureC.find({sensorID: sensorId, type: typePost}).toArray();
                        const measures = []; // Tableau pour stocker les mesures de chaque capteur

                        MeasureData.forEach((data) => {
                            try {
                                if (data) {
                                    const {value, creationDate: dataDate, _id: dataID} = data;
                                    // Ajouter la mesure au tableau des mesures
                                    measures.push({dataID, value, dataDate});
                                } else {
                                    // Échec de la connexion
                                    res.status(401).json({success: false, message: 'Pas de data trouvé'});
                                }
                            } catch (error) {
                                console.error('Erreur lors de la vérification des informations de chaque capteur :', error);
                                res.status(500).json({success: false, message: 'Erreur serveur'});
                            }
                        });
                        return {sensorId, sensorDate, location, measures};
                    } else {
                        // Échec de la connexion
                        res.status(401).json({success: false, message: 'Pas de personne trouvée'});
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification des informations des capteurs :', error);
                    res.status(500).json({success: false, message: 'Erreur serveur'});
                }
            }));

            // results contient les résultats de chaque itération
            await res.json({success: true, tabs: results});
        } else {
            // Échec de la connexion
            res.status(401).json({success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect'});
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des informations d\'identification :', error);
        res.status(500).json({success: false, message: 'Erreur serveur'});
    }
});

app.post('/client/all-sensors', async (req, res) => {
    const {email, pswd} = req.body;
    let password = pswd;
    let typePostH = "humidity";
    let typePostAP = "airPollution";
    let typePostTemp = "temperature";
    // Utilisation de la base de données pour vérifier les informations d'identification
    const db = client.db('Dashboard');
    const userC = db.collection('User');
    try {
        const user = await userC.findOne({email, password});
        const sensorC = db.collection('Sensor');
        console.log(user);
        if (user) {
            const {_id} = user;
            const sensorData = await sensorC.find({userID: _id}).toArray();
            const MeasureC = db.collection('Measure');

            // Utilisation de map pour traiter chaque document de manière asynchrone
            const resultsH = await Promise.all(sensorData.map(async (sensor) => {
                console.log(sensor);

                try {
                    if (sensor) {
                        const {_id: sensorId, creationDate: sensorDate, location, userID} = sensor;
                        const MeasureData = await MeasureC.find({sensorID: sensorId, type: typePostH}).toArray();
                        const measures = []; // Tableau pour stocker les mesures de chaque capteur

                        MeasureData.forEach((data) => {
                            try {
                                if (data) {
                                    const {value, creationDate: dataDate, _id: dataID} = data;
                                    // Ajouter la mesure au tableau des mesures
                                    measures.push({dataID, value, dataDate});
                                } else {
                                    // Échec de la connexion
                                    res.status(401).json({success: false, message: 'Pas de data trouvé'});
                                }
                            } catch (error) {
                                console.error('Erreur lors de la vérification des informations de chaque capteur :', error);
                                res.status(500).json({success: false, message: 'Erreur serveur'});
                            }
                        });
                        return {sensorId, sensorDate, location, measures};
                    } else {
                        // Échec de la connexion
                        res.status(401).json({success: false, message: 'Pas de personne trouvée'});
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification des informations des capteurs :', error);
                    res.status(500).json({success: false, message: 'Erreur serveur'});
                }
            }));

            const resultsAP = await Promise.all(sensorData.map(async (sensor) => {
                // Process each document here
                console.log(sensor);

                try {
                    if (sensor) {
                        const {_id: sensorId, creationDate: sensorDate, location, userID} = sensor;
                        const MeasureData = await MeasureC.find({sensorID: sensorId, type: typePostAP}).toArray();
                        const measures = []; // Tableau pour stocker les mesures de chaque capteur

                        MeasureData.forEach((data) => {
                            try {
                                if (data) {
                                    const {value, creationDate: dataDate, _id: dataID} = data;
                                    // Ajouter la mesure au tableau des mesures
                                    measures.push({dataID, value, dataDate});
                                } else {
                                    // Échec de la connexion
                                    res.status(401).json({success: false, message: 'Pas de data trouvé'});
                                }
                            } catch (error) {
                                console.error('Erreur lors de la vérification des informations de chaque capteur :', error);
                                res.status(500).json({success: false, message: 'Erreur serveur'});
                            }
                        });
                        return {sensorId, sensorDate, location, measures};
                    } else {
                        // Échec de la connexion
                        res.status(401).json({success: false, message: 'Pas de personne trouvée'});
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification des informations des capteurs :', error);
                    res.status(500).json({success: false, message: 'Erreur serveur'});
                }
            }));

            const resultsTemp = await Promise.all(sensorData.map(async (sensor) => {
                // Process each document here
                console.log(sensor);

                try {
                    if (sensor) {
                        const {_id: sensorId, creationDate: sensorDate, location, userID} = sensor;
                        const MeasureData = await MeasureC.find({sensorID: sensorId, type: typePostTemp}).toArray();
                        const measures = []; // Tableau pour stocker les mesures de chaque capteur

                        MeasureData.forEach((data) => {
                            try {
                                if (data) {
                                    const {value, creationDate: dataDate, _id: dataID} = data;
                                    // Ajouter la mesure au tableau des mesures
                                    measures.push({dataID, value, dataDate});
                                } else {
                                    // Échec de la connexion
                                    res.status(401).json({success: false, message: 'Pas de data trouvé'});
                                }
                            } catch (error) {
                                console.error('Erreur lors de la vérification des informations de chaque capteur :', error);
                                res.status(500).json({success: false, message: 'Erreur serveur'});
                            }
                        });
                        return {sensorId, sensorDate, location, measures};
                    } else {
                        // Échec de la connexion
                        res.status(401).json({success: false, message: 'Pas de personne trouvée'});
                    }
                } catch (error) {
                    console.error('Erreur lors de la vérification des informations des capteurs :', error);
                    res.status(500).json({success: false, message: 'Erreur serveur'});
                }
            }));

            // results contient les résultats de chaque itération
            await res.json({success: true, tabH: resultsH, tabAP: resultsAP, tabTemp: resultsTemp});
        } else {
            // Échec de la connexion
            res.status(401).json({success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect'});
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des informations d\'identification :', error);
        res.status(500).json({success: false, message: 'Erreur serveur'});
    }
});


// C.R.U.D.

const mongoose = require('mongoose');
const sensorSchema = new mongoose.Schema({
    creationDate: String,
    location: String,
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});
const sensorIDSchema = new mongoose.Schema({
    sensorID: {type: mongoose.Schema.Types.ObjectId, ref: 'Sensor'},
});
const userIDSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

const Sensor = mongoose.model('Sensor', sensorSchema);
const sensConvID = mongoose.model('sensConvID', sensorIDSchema);
const userConvID = mongoose.model('userConvID', userIDSchema);


// ------------------------------------------------------------ Sensor CRUD ------------------------------------------------------------ //
// Create (Créer un capteur pour un utilisateur)
app.post('/client/:userId/sensors', async (req, res) => {
    try {
        console.log('Received sensor creation request for user ID:', req.params.userId);

        const newSensor = new Sensor({
            creationDate: req.body.creationDate,
            location: req.body.location,
            userID: req.params.userId,
        });
        const db = await client.db('Dashboard');
        const result = await db.collection('Sensor').insertOne(newSensor);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating sensor:', error);
        res.status(500).json({error: error.message, stack: error.stack});
    }
});

// Read (Lire les capteurs d'un utilisateur)
app.get('/client/:userId/sensors', async (req, res) => {
    try {
        console.log('Received user ID to get sensors :', req.params.userId);
        const db = await client.db('Dashboard');

        const newUserConvID = new userConvID({
            userID: req.params.userId,
        });

        const sensors = await db.collection('Sensor').find({userID: newUserConvID.userID}).toArray();
        await res.json(sensors);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Update un capteur
app.put('/sensors/:sensorId', async (req, res) => {
    try {
        const convID = new sensConvID({
            sensorID: req.params.sensorId,
        });

        const db = await client.db('Dashboard');

        // Mettre à jour le document
        const updateResult = await db.collection('Sensor').updateOne(
            {_id: convID.sensorID},
            {$set: {creationDate: req.body.creationDate, location: req.body.location}}
        );

        // Vérifier si la mise à jour a réussi
        if (updateResult.modifiedCount > 0) {
            // Rechercher le document mis à jour
            const updatedDocument = await db.collection('Sensor').findOne({_id: convID.sensorID});

            res.json(updatedDocument); // Renvoyer le document mis à jour
        } else {
            res.status(404).json({message: 'Document non trouvé'});
        }
    } catch (error) {
        console.log("Update sensor got an error");
        res.status(500).json({error: error.message});
    }
});


// Delete (Supprimer un capteur)
app.delete('/sensors/:sensorId', async (req, res) => {
    try {
        const convID = new sensConvID({
            sensorID: req.params.sensorId,
        });

        const db = await client.db('Dashboard');

        const deletedSensor = await db.collection('Sensor').deleteOne({_id: convID.sensorID});
        res.json(deletedSensor);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------- //

// ------------------------------------------------------------ Measure CRUD ------------------------------------------------------------ //

// app.get('/admin-client/sensorsType/:sensorId:userId', async (req, res) => {
//     try {
//         const db = await client.db('Dashboard');
//
//         const newSensConvID = new sensConvID({
//             sensorID: req.params.sensorId,
//         });
//
//         const newUserConvID = new userConvID({
//             userID: req.params.userId,
//         });
//
//         const sensors = await db.collection('Sensor').find({userID : newUserConvID.userID});
//
//         const measureType = await db.collection('Measure').findOne({sensorID: newSensConvID.sensorID});
//         await res.json(measureType);
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// });

// ------------------------------------------------------------------------------------------------------------------------------------- //

// ------------------------------------------------------------ User CRUD ------------------------------------------------------------ //

const userSchema = new mongoose.Schema({
    location: String,
    email: String,
    password: String,
    role: String,
    personsInHouse: Number,
    houseSize: String
});

const User = mongoose.model('User', userSchema);

app.post('/client/register', async (req, res) => {
    try {

        const newUser = new User({
            location: req.body.location,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            personsInHouse: req.body.personsInHouse,
            houseSize:  req.body.houseSize
        });

        const db = await client.db('Dashboard');
        const result = await db.collection('User').insertOne(newUser);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating sensor:', error);
        res.status(500).json({error: error.message, stack: error.stack});
    }
});

app.delete('/client/delete/:userId', async (req, res) => {
    try {

        const convID = new userConvID({
            userID: req.params.userId,
        });

        const db = await client.db('Dashboard');
        const result = await db.collection('User').deleteOne({_id : convID.userID});

        res.status(201).json(result);
    } catch (error) {
        console.error('Error creating sensor:', error);
        res.status(500).json({error: error.message, stack: error.stack});
    }
});

// ----------------------------------------------------------------------------------------------------------------------------------- //

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
