import { ApiResponse } from '../../utils/ApiResponse';
import { ProductServices } from './product.services';
import { createProductSchema } from './product.validator';
import { NextFunction, Request, Response } from "express";

export class ProductController {
    static async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const validate_data = createProductSchema.parse(req.body)
            const new_product = await ProductServices.createProduct({ item: validate_data })
            return ApiResponse(res, 201, true, "Product created successfully", new_product)
        } catch (error) {
            next(error)
        }
    }

    static async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductServices.getAllProducts()
            return ApiResponse(res, 200, true, "Products fetched successfully", products)
        } catch (error) {
            next(error)
        }
    }

    static async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductServices.getProductById(Number(req.params.id));
            return ApiResponse(res, 200, true, "Product fetched successfully", product)
        } catch (error) {
            next(error)
        }
    }


    static async getProductByProductName(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductServices.getProductByGenericName(req.params.product_name)
            ApiResponse(res, 200, true, "Product fetched successfully", product)
        } catch (error) {
            next(error)
        }
    }

    static async getProductByGenericName(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await ProductServices.getProductByGenericName(req.params.generic_name)
            ApiResponse(res, 200, true, "Product fetched successfully", product)
        } catch (error) {
            next(error)
        }
    }

    static async editProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id)
            const data = req.body

            await ProductServices.editProductById(id, data)

            return ApiResponse(res, 200, true, "Product details updated successfully")
        } catch (error) {
            next(error)
        }
    }

    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            await ProductServices.deleteProductById(Number(req.params.id))
            return ApiResponse(res, 200, true, "Product deleted successfully")

        } catch (error) {
            next(error)
        }
    }

    static async getProductCount(req: Request, res: Response, next: NextFunction) {
        try {
            const count = await ProductServices.getProductCount();
            return ApiResponse(res, 200, true, "Product count fetched", { count })
        } catch (error) {
            next(error)
        }
    }

    static async getStockValue(req: Request, res: Response, next: NextFunction) {
        try {
            const value = await ProductServices.getStockValue()
            return ApiResponse(res, 200, true, "Stock value fetched successfully", value)

        } catch (error) {
            next(error)
        }
    }

    static async getOutOfStockCount(req: Request, res: Response, next: NextFunction) {
        try {
            const count = await ProductServices.getOutOfStockCount()
            return ApiResponse(res, 200, true, "Out of Stock count fetched successfully", { count })

        } catch (error) {
            next(error)
        }
    }

}