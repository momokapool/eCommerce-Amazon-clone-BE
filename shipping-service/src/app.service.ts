import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    private prismaService: PrismaService,
    @Inject("NOTIFY_NAME") private notifySerivce: ClientProxy,
  ) { }
  async shipping(data) {

    let { order_id, full_name, email, phone, address } = data

    let newShip = {
      order_id: order_id,
      full_name: full_name,
      email: email,
      phone: phone,
      address: address,
      create_at: new Date()
    }
    await this.prismaService.shipping.create({ data: newShip })

    // gọi  send mail service => thông báo đặt hàng thành công
    this.notifySerivce.emit("MAIL_SUCCESS_NAME", data)

  }
}
