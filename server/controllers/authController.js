const { client, USERS_DB } = require('../services/cloudantService');

// Save or Update User Profile
async function saveUser(req, res) {
    try {
        const { userId, name, email, photoUrl } = req.body;

        if (!userId || !email) {
            return res.status(400).json({ error: 'UserId and email are required' });
        }

        let existingDoc = null;
        let rev = null;

        try {
            // Check if user already exists to get its _rev for updating
            const existing = await client.getDocument({
                db: USERS_DB,
                docId: userId
            });
            existingDoc = existing.result;
            rev = existingDoc._rev;
        } catch (dbErr) {
            if (dbErr.status !== 404) {
                throw dbErr;
            }
        }

        const document = {
            _id: userId,
            name: name || (existingDoc ? existingDoc.name : ''),
            email: email,
            photoUrl: photoUrl || (existingDoc ? existingDoc.photoUrl : ''),
            createdAt: existingDoc ? existingDoc.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (rev) {
            document._rev = rev;
        }

        await client.postDocument({
            db: USERS_DB,
            document
        });

        res.json({ message: 'User profile saved successfully', user: document });
    } catch (err) {
        console.error('SAVE USER ERROR:', err.message);
        res.status(500).json({ error: 'Failed to save user profile' });
    }
}

// Get User Profile
async function getUser(req, res) {
    try {
        const { userId } = req.params;

        const response = await client.getDocument({
            db: USERS_DB,
            docId: userId
        });

        res.json({
            name: response.result.name,
            email: response.result.email,
            photoUrl: response.result.photoUrl || "",
            createdAt: response.result.createdAt
        });
    } catch (err) {
        if (err.status === 404) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.error('GET USER ERROR:', err.message);
        res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
}

module.exports = { saveUser, getUser };