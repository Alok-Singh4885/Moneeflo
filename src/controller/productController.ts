import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler'; 
import { addProductsService, viewQuotationsService } from '../service/productService';

export const addProducts = asyncHandler(async (req: Request, res: Response) => {

    const  userId  = +req.params.user_id;
    const { products } = req?.body;

    if (!products || !Array.isArray(products)) {
        res.status(400).json({
            success: false,
            message: 'Products array is required'
        })
        return;
    }

    const pdfPath = await addProductsService(userId, products);

    res.status(201).json({
        success: true,
        message: 'Products added and invoice generated',
        pdfPath: pdfPath,
    });
});

export const viewQuotations = asyncHandler(async (req: Request, res: Response) => {
    
    const  userId  = +req.params.user_id;

    if (!userId) {
        res.status(400).json({
            success: false,
            message: 'Unauthorized access'
        })
        return;
    }

    const quotations = await viewQuotationsService(userId);

    res.status(200).json({
        success: true,
        quotations: quotations,
    });
});
