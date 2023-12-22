export interface ISubtotal {
    shoppingCartId: string;
    cartDetailId: string;
    quantity: number;
    productId: string;
    product_name: string;
    unit_price: number;
    subtotal_by_product: number;
}
