/* import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductService } from './product.service';

@Controller('shopping-cart')
export class ShoppingCartController {
    constructor(
        private readonly shoppingCartService: ShoppingCartService,
        private readonly productService: ProductService,
    ) { }

    @Post('/add-product')
    async addProductToCart(@Body() productData: { productId: number }, @Req() request: Request, @Res() response: Response) {
        try {
            const userId = request.user.id; // Suponiendo que tienes la información del usuario en el request
            const productId = productData.productId;

            // Verificar si el usuario tiene un carrito existente
            const cart = await this.shoppingCartService.getCartByUserId(userId);

            // Si no hay carrito, crear uno nuevo
            if (!cart) {
                await this.shoppingCartService.createCartForUser(userId);
            }

            // Agregar el producto al carrito existente o al nuevo carrito
            await this.shoppingCartService.addProductToCart(userId, productId);

            // Enviar una respuesta de éxito al frontend
            return response.status(200).json({ message: 'Producto agregado al carrito correctamente' });
        } catch (error) {
            // Manejar cualquier error que ocurra
            return response.status(500).json({ message: 'Error al agregar el producto al carrito' });
        }
    }
}
 */