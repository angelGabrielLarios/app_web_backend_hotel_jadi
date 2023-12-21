import { Injectable } from '@nestjs/common';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDetail } from './entities/cart-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartDetailsService {

  constructor(
    @InjectRepository(CartDetail)
    private cartDetailRepository: Repository<CartDetail>
  ) { }

  async create(createCartDetailDto: CreateCartDetailDto) {
    const cartDetailRef = this.cartDetailRepository.create({
      quantity: createCartDetailDto.quantity,
      status: createCartDetailDto.status,
      product: { id: createCartDetailDto.idProduct },
      shoppingCart: { id: createCartDetailDto.idShoppingCart }
    })

    const cartDetail = await this.cartDetailRepository.save(cartDetailRef)

    return cartDetail

  }

  findAll() {
    return `This action returns all cartDetails`;
  }

  async findOneById({ id }: { id: string }) {
    const cartDetail = await this.cartDetailRepository.findOne({
      relations: {
        product: {
          section: true
        },
        shoppingCart: true
      },
      where: {
        id
      }
    })

    return cartDetail
  }

  async findOneByIdProductAndIdShopping({ idProduct, idShoppingCart }: { idProduct: string, idShoppingCart: string }) {
    const cartDetail = await this.cartDetailRepository.findOne({
      relations: {
        product: {
          section: true
        },
        shoppingCart: true,
      },
      where: {
        product: {
          id: idProduct
        },
        shoppingCart: {
          id: idShoppingCart,
        }
      }
    })
    return cartDetail
  }


  async updateById({ id, cartDetail }: { id: string, cartDetail: CartDetail }) {
    const cartDetailUpdate = await this.cartDetailRepository.update({ id: id }, {
      ...cartDetail
    })

    console.log(cartDetailUpdate)
    return await this.findOneById({ id })
  }

  remove(id: number) {
    return `This action removes a #${id} cartDetail`;
  }
}
