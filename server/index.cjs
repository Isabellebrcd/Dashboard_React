const express = require('express');
const router = express.Router();
const {getProfils} = require('./profils.cjs');
const {getMeasure} = require('./profils.cjs');

router.get('/', async (req, res) => {
    try {
        const profils = await getProfils();
        res.json(profils);
        const measure = await getMeasure();
        res.json(measure);
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const profils = await getProfils();
        const user = profils.find((profil) => profil.email === email);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Authentification réussie
        res.json({ message: 'Authentification réussie', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
