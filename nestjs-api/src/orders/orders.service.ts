import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    return this.orderModel.create({ amount: createOrderDto.amount });
  }

  findAll() {
    return this.orderModel.findAll();
  }

  findOne(id: number) {
    return this.orderModel.findByPk(id, { rejectOnEmpty: true });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    order.update(updateOrderDto);
    return order;
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    order.destroy();
  }
}
