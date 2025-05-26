import { body, param } from 'express-validator';

export const validateCartId = [
    param('cid')
        .notEmpty()
        .withMessage('El ID del carrito es obligatorio'),
];

export const validateProductId = [
    param('pid')
        .notEmpty()
        .withMessage('El ID del producto es obligatorio'),
];

export const validateAddProductToCart = [
    ...validateCartId,
    ...validateProductId,
];
