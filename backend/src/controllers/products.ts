import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request-error';

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ items: products, total: products.length });
    } catch (err) {
        next(err);
    }
};

export const createProduct = async (_req: Request, res: Response, next: NextFunction) => {
    const product = new Product(_req.body);
    try {
        const newProduct = await product.save();
        return res.status(201).json(newProduct);
    } catch (err) {
        if (err instanceof Error && err.message.includes('E11000')) {
            return next(new ConflictError('Товар с таким полем "title" уже существует'));
        }

        if (err instanceof MongooseError.ValidationError) {
            return next(new BadRequestError(err.message));
        }
        return next(err);
    }
};
