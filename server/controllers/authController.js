const { registerUser, loginUser } = require('../services/authService');
const { client, USERS_DB } = require('../services/cloudantService');

// Signup
async function signup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        const result = await registerUser(name, email, password);

        // Save user profile to Cloudant
        try {
            await client.postDocument({
                db: USERS_DB,
                document: {
                    _id: result.id, // Use App ID's user ID as the Cloudant document ID
                    name,
                    email,
                    createdAt: new Date().toISOString()
                }
            });
            console.log('User saved to Cloudant:', result.id);
        } catch (dbErr) {
            console.error('Failed to save user to Cloudant:', dbErr.message);
            // We don't fail the signup if Cloudant fails, but we log it
        }

        res.json({
            message: 'Account created successfully',
            userId: result.id
        });

    } catch (err) {
        const errorMsg = err.response?.data?.error_description || err.response?.data?.error || err.message;
        console.error('SIGNUP ERROR:', errorMsg);
        
        // Pass the actual App ID error message back to the frontend
        res.status(500).json({ 
            error: errorMsg.includes('already exists') 
                ? 'Email is already in use.' 
                : `App ID Error: ${errorMsg}` 
        });
    }
}

// Login
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const result = await loginUser(email, password);

        res.json({
            message: 'Login successful',
            token: result.access_token,
            userId: result.sub
        });

    } catch (err) {
        console.error('LOGIN ERROR:', err.message);
        res.status(401).json({ error: 'Invalid email or password' });
    }
}

module.exports = { signup, login };