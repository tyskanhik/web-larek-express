import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/bad-request-error';
import Product from '../models/product';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { items, total } = req.body;
    try {
        if (!Array.isArray(items) || items.length === 0) {
            return next(new BadRequestError('Массив items не должен быть пустым.'));
        }

        const products = await Product.find({
            _id: { $in: items },
            price: { $ne: null },
        });

        if (products.length !== items.length) {
            return next(new BadRequestError('Некоторые товары не найдены или не продаются.'));
        }

        const totalCalculated = products.reduce((acc, product) => acc + product.price!, 0);

        if (totalCalculated !== total) {
            return next(new BadRequestError(`Общая стоимость товаров (${totalCalculated}) не совпадает с указанной (${total}).`));
        }

        const orderId = faker.string.uuid();
        return res.status(201).json({
            id: orderId,
            total,
        });
    } catch (err: any) {
        return next(err);
    }
};
