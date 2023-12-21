import { Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Repository } from 'typeorm';
import { CartDetailsService } from 'src/cart-details/cart-details.service';


@Injectable()
export class ShoppingCartService {

  constructor(
    @InjectRepository(ShoppingCart)
    private shoppingCartRepository: Repository<ShoppingCart>,
    private cartDetailService: CartDetailsService,
  ) { }

  async create({ idUser }: { idUser: string }) {
    const shoppingCartRef = this.shoppingCartRepository.create({
      user: { id: idUser }
    })

    const shoppingCart = await this.shoppingCartRepository.save(shoppingCartRef)

    return shoppingCart
  }
  async addProductToCart(createShoppingCartDto: CreateShoppingCartDto) {
    let shoppingCart: ShoppingCart = await this.findOneByIdUser({
      idUser: createShoppingCartDto.idUser
    })

    const addQuantity = 1


    if (!shoppingCart) {
      shoppingCart = await this.create({ idUser: createShoppingCartDto.idUser })
    }

    const existCartDetail = await this.cartDetailService.findOneByIdProductAndIdShopping({
      idProduct: createShoppingCartDto.idProduct, idShoppingCart: shoppingCart.id
    })

    if (existCartDetail) {

      const prevQuantity = existCartDetail.quantity
      const cartDetail = await this.cartDetailService.updateById({
        id: existCartDetail.id,
        cartDetail: {
          ...existCartDetail,
          quantity: prevQuantity + 1
        }
      })

      return cartDetail
    }


    const cartDetail = await this.cartDetailService.create({
      idProduct: createShoppingCartDto.idProduct,
      quantity: addQuantity,
      idShoppingCart: shoppingCart.id,
      status: 'pending'
    })

    return cartDetail

  }

  findAll() {
    return `This action returns all shoppingCart`;
  }

  async findOneByIdUser({ idUser }: { idUser: string }) {
    const shoppingCart = await this.shoppingCartRepository.findOne({
      relations: {
        user: true
      },
      where: {
        user: {
          id: idUser
        }
      }
    })

    return shoppingCart
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
