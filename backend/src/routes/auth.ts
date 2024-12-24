import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/knex_db';

const router = express.Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
    const { email, password, name } = req.body;
  
    try {
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            res.status(400).json({ message: 'Email is already in use.' });
            return;
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const [newUserId] = await db('users').insert(
            {
              email,
              password_hash: passwordHash,
              name,
            },
            ['id']
          );
      
          res.status(201).json({
            message: 'User registered successfully.',
            user: {
              id: newUserId,
              email,
              name,
            },
          });
          
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});
  

router.post('/login', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return 
        }

        const user = await db('users').where({ email }).first();
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials.' });
            return 
        }

        // Generate a JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name }, // Payload
            process.env.JWT_SECRET as string, // Secret key from .env
            { expiresIn: '1h' } // Token expiration time
        );

        // Return success response
        res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
        
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

export default router;