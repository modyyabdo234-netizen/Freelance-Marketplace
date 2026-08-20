import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  role: 'Client' | 'Freelancer';
}

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  let token: string | undefined;

  // 1. قراءة التوكن من Header أو Cookies
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // 2. التحقق من وجود التوكن
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  try {
    // 3. فك تشفير التوكن والتحقق من صحته
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_secret_key'
    ) as JwtPayload;

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};