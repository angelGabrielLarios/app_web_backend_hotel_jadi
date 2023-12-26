import { Injectable } from '@nestjs/common';
import { CreatePaypalDto } from './dto/create-paypal.dto';
import { UpdatePaypalDto } from './dto/update-paypal.dto';
import { ConfigService } from '@nestjs/config';
import { IPaypalAccesToken } from './interfaces/paypal-access-token.interface';
import { CreateProductPaypalDto } from './dto/create-product-paypal.dto';

@Injectable()
export class PaypalService {

  private client_id: string
  private client_secret: string
  private endpoint_url: string

  constructor(private configService: ConfigService) {
    this.client_id = this.configService.get<string>('client_id')

    this.client_secret = this.configService.get<string>('client_secret')

    this.endpoint_url = this.configService.get<string>('environment') === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';


  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createPaypalDto: CreatePaypalDto) {
    return 'This action adds a new paypal';
  }

  async getAccessToken() {


    const client_id = this.client_id
    const client_secret = this.client_secret


    const auth = `${client_id}:${client_secret}`
    const data = 'grant_type=client_credentials'


    const response = await fetch(`${this.endpoint_url}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
      },
      body: data
    })

    const dataAPI: IPaypalAccesToken = await response.json() as IPaypalAccesToken

    console.log(dataAPI)
    return dataAPI

  }

  async createOrder({ intent, products }: { intent: string, products: CreateProductPaypalDto[] }) {
    try {
      const { access_token } = await this.getAccessToken()


      const totalPrice: number = products.reduce((total, product) => {
        const productTotal = product.price * product.quantity;
        return total + productTotal;
      }, 0);


      console.log(totalPrice)
      const orderDataJSON = {
        intent: intent.toUpperCase(),
        "purchase_units": [
          {
            "items": products.map(product => {
              return {
                name: product.name,
                description: product.description.substring(0, 20),
                quantity: `${product.quantity}`,
                unit_amount: {
                  currency_code: "MXN",
                  value: `${product.price}`
                }
              }
            }),
            amount: {
              currency_code: "MXN",
              value: `${totalPrice}`,
              breakdown: {
                item_total: {
                  currency_code: "MXN",
                  value: `${totalPrice}`
                }
              }
            }
          }
        ],
        application_context: {
          return_url: "https://example.com/return",
          cancel_url: "https://example.com/cancel"
        }
      }


      const response = await fetch(`${this.endpoint_url}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify(orderDataJSON)
      })

      const dataAPI = await response.json()


      console.log(dataAPI)
      return dataAPI
    } catch (error) {
      console.error(error)
    }
  }

  async completeOrder({ order_id, intent }: { order_id: string, intent: string }) {
    const { access_token } = await this.getAccessToken()

    const response = await fetch(`${this.endpoint_url}/v2/checkout/orders/${order_id}/${intent}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    })

    const dataAPI = await response.json()
    return dataAPI
  }

  findAll() {
    return `This action returns all paypal`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paypal`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updatePaypalDto: UpdatePaypalDto) {
    return `This action updates a #${id} paypal`;
  }

  remove(id: number) {
    return `This action removes a #${id} paypal`;
  }
}
