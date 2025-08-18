interface IProduct {
    id?: number,
    product_code: number,
    product_name?: string,
    generic_name: string,
    manufacturer?: string,
    pack_size: string,
    category: string,
    expiry_date: string | Date,
    quantity: number,
    mrp: number,
    rate: number,
    discount: number,
    tax: number,
    gross_amount: number,
    final_amount: number,
    final_rate: number,
}


export default IProduct