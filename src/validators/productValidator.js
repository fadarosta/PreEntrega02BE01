import { body } from 'express-validator';

export const validateProduct = [
    body('title')
        .notEmpty()
        .withMessage('El título es obligatorio'),
    body('description')
        .notEmpty()
        .withMessage('La descripción es obligatoria'),
    body('code')
        .notEmpty()
        .withMessage('El código es obligatorio'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('El precio debe ser un número positivo'),
    body('status')
        .isBoolean()
        .withMessage('El estado debe ser booleano'),
    body('stock')
        .isInt({ gt: 0 })
        .withMessage('El stock debe ser un número entero positivo'),
    body('category')
        .notEmpty()
        .withMessage('La categoría es obligatoria'),
    body('thumbnails')
        .isArray()
        .withMessage('Las miniaturas deben ser un array de strings'),
];
