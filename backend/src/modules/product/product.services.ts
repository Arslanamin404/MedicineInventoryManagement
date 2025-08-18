import { prisma } from '../../lib/prisma';
import { CreateProductInput, updateProductSchema } from './product.validator';

export class ProductServices {
    static async createProduct({ item }: { item: CreateProductInput }) {
        const { product_name, generic_name, manufacturer, pack_size, category, expiry_date, quantity, mrp, rate, discount, tax } = item;

        const gross_amount = rate * quantity;
        const discountAmount = (gross_amount * discount) / 100;
        const amountAfterDiscount = gross_amount - discountAmount;
        const taxAmount = (amountAfterDiscount * tax) / 100;
        const final_amount = amountAfterDiscount + taxAmount;
        const final_rate = final_amount / quantity;


        return await prisma.product.create({
            data: {
                product_name, generic_name, manufacturer, pack_size, category, expiry_date, quantity, mrp, rate, discount, tax, gross_amount,
                final_amount, final_rate
            }
        });
    }

    static async getAllProducts() {
        return await prisma.product.findMany()
    }


    static async getProductByProductName(product_name: string) {
        const product = await prisma.product.findMany({
            where: {
                product_name: {
                    contains: product_name,
                    mode: "insensitive"
                }
            }
        })
        if (product.length === 0)
            throw new Error(`NOT FOUND! ${product_name.toUpperCase()} does not exist`);
        return product
    }

    static async getProductByGenericName(generic_name: string) {
        const product = await prisma.product.findMany({
            where: { generic_name: { contains: generic_name, mode: 'insensitive' } }
        })
        if (product.length === 0)
            throw new Error(`NOT FOUND! ${generic_name.toUpperCase()} does not exist`);
        return product
    }

    static async getProductById(id: number) {
        const product = await prisma.product.findUnique({ where: { id } })
        if (!product)
            throw new Error(`NOT FOUND! Product with id ${id} does not exist`);
        return product
    }

    static async editProductById(id: number, data: unknown) {
        const product = await prisma.product.findUnique({ where: { id } })
        if (!product)
            throw new Error(`NOT FOUND! Product with id ${id} does not exist`);

        const parsedData = updateProductSchema.parse(data)

        const rate = Number(parsedData.rate ?? product.rate);
        const quantity = Number(parsedData.quantity ?? product.quantity);
        const discount = Number(parsedData.discount ?? product.discount);
        const tax = Number(parsedData.tax ?? product.tax);

        const gross_amount = rate * quantity;
        const discountAmount = (gross_amount * discount) / 100;
        const amountAfterDiscount = gross_amount - discountAmount;
        const taxAmount = (amountAfterDiscount * tax) / 100;
        const final_amount = amountAfterDiscount + taxAmount;
        const final_rate = final_amount / quantity;

        return prisma.product.update({
            where: { id },
            data: {
                ...parsedData,
                gross_amount,
                final_amount,
                final_rate
            }
        });
    }

    static async deleteProductById(id: number) {
        const product = await prisma.product.findUnique({ where: { id } })
        if (!product)
            throw new Error(`Product with id ${id} does not exits`);
        return await prisma.product.delete({ where: { id } })
    }

    static async getProductCount() {
        return prisma.product.count({
            where: {
                quantity: {
                    gt: 0
                }
            }
        })
    }

    static async getStockValue() {
        return await prisma.product.aggregate({
            _sum: {
                final_amount: true,
            },
            where: {
                quantity: {
                    gt: 0
                }
            }
        })
    }

    static async getOutOfStockCount() {
        return await prisma.product.count({
            where: {
                quantity: {
                    equals: 0
                }
            }
        })
    }
}