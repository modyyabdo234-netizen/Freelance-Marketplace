import { Request, Response, NextFunction } from 'express';

export const protect = (req: Request, res: Response, next: NextFunction): void => {
  const userId = req.headers['x-user-id'] as string;
  const userRole = req.headers['x-user-role'] as 'Client' | 'Freelancer';

  if (!userId || !userRole) {
    res.status(401).json({ 
      message: 'Not authorized, missing auth headers. Please provide x-user-id and x-user-role in Postman headers.' 
    });
    return;
  }

  req.user = {
    id: userId,
    role: userRole,
  };

  next();
};
