import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SectionsService } from 'src/sections/sections.service';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { arrProductsData } from './products-test';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private sectionService: SectionsService
  ) { }
  async save(createProductDto: CreateProductDto) {
    const product = this.productRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      imageURL: createProductDto.imageURL,
      amount: createProductDto.amount,
      section: { id: createProductDto.idSection } // Asignación del ID de la sección directamente
    })


    const productRow = await this.productRepository.save(product)

    return productRow
  }

  async findAllWithSection() {


    const products = await this.productRepository.find({
      select: {
        section: {
          name: true
        }
      },
      relations: {
        section: true
      }
    })

    return products

  }

  async findAllWithSectionByNameSection({ nameSection }: { nameSection: string }) {


    const products = await this.productRepository.find({
      select: {
        section: {
          name: true
        }
      },
      relations: {
        section: true
      },
      where: {
        section: {
          name: nameSection
        }
      }

    })

    return products

  }

  async saveMultiples() {

    arrProductsData.forEach(async (product) => {
      const productRef = this.productRepository.create({
        name: product.name,
        description: product.description,
        price: product.price,
        imageURL: product.imageURL,
        amount: product.amount,
        section: { id: product.idSection } // Asignación del ID de la sección directamente
      })

      await this.productRepository.save(productRef)
    })

    return { message: `data insert` }
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne({ id }: { id: string }) {
    const product = await this.productRepository.findOne({
      select: {
        section: {
          name: true
        }
      },
      relations: {
        section: true
      },
      where: {
        id
      }
    })

    if (!product) {
      throw new NotFoundException(`not_found`, `The product with the id '${id}' was not found`)
    }


    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    console.log(updateProductDto)
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
