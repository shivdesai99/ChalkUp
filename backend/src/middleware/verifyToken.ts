import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: { id: number; email: string; name: string };
}

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Access token is missing or invalid.' });
        return
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded as { id: number; email: string; name: string };
        next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token.' });
        return
    }
};

export default verifyToken;
