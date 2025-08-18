import { NextFunction, Request, Response, Router } from "express";
import { ProductController } from "./product.controller";

const productRouter = Router();

// Create product
productRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
    ProductController.createProduct(req, res, next);
});

// Get all
productRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    ProductController.getAllProducts(req, res, next);
});


// Get by product name
productRouter.get("/name/:product_name", (req: Request, res: Response, next: NextFunction) => {
    ProductController.getProductByProductName(req, res, next);
});

// Get by generic name
productRouter.get("/generic/:generic_name", (req: Request, res: Response, next: NextFunction) => {
    ProductController.getProductByGenericName(req, res, next);
});

// Get by product id (must use generic id route at last)
productRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
    ProductController.getProductById(req, res, next);
});

// Update by product by id code 
productRouter.put("/edit/:id", (req: Request, res: Response, next: NextFunction) => {
    ProductController.editProductById(req, res, next);
});

// Delete by product code
productRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
    ProductController.deleteProduct(req, res, next);
});

// get active product count
productRouter.get("/stats/count", (req: Request, res: Response, next: NextFunction) => {
    ProductController.getProductCount(req, res, next)
})

// get stock value
productRouter.get("/stats/value", (req: Request, res: Response, next: NextFunction) => {
    ProductController.getStockValue(req, res, next)
})

// get outof stock count
productRouter.get("/stats/out-of-stock", (req: Request, res: Response, next: NextFunction) => {
    ProductController.getOutOfStockCount(req, res, next)
})

export default productRouter;
