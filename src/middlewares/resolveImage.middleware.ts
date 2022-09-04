import { NextFunction, Request, Response } from 'express';

const resolveImageMiddware = async (req: Request, res: Response, next: NextFunction) => {
    const productData = req.body;
    if (productData.images) {
    }

    next();
};

export default resolveImageMiddware;
