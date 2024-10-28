import { celebrate, Joi, Segments } from 'celebrate';

enum Payment {
    CARD = 'card',
    ONLINE = 'online',
}

export const orderCreationValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
        payment: Joi.string()
            .valid(Payment.CARD, Payment.ONLINE)
            .required()
            .messages({
                'any.required': 'Payment is required.',
                'any.only': 'Payment must be either card or online.',
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'any.required': 'Email is required.',
                'string.email': 'Email must be a valid email address.',
            }),
        phone: Joi.string()
            .required()
            .messages({
                'any.required': 'Phone number is required.',
            }),
        address: Joi.string()
            .required()
            .messages({
                'any.required': 'Address is required.',
            }),
        total: Joi.number()
            .required()
            .min(0)
            .messages({
                'any.required': 'Total is required.',
                'number.min': 'Total must be a positive number.',
            }),
        items: Joi.array()
            .items(Joi.string())
            .required()
            .min(1)
            .messages({
                'any.required': 'Items are required.',
                'array.min': 'At least one item is required.',
            }),
    }),
});
