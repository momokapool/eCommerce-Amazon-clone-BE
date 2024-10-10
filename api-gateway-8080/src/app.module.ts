import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      // {
      //   name: 'PRODUCT_NAME',
      //   transport: Transport.RMQ,
      //   options: {
      //     urls: ['amqp://admin:1234@localhost:5672'],
      //     queue: 'product_queue',
      //     queueOptions: {
      //       durable: false,
      //     },
      //   },
      // },
      {
        name: 'ORDER_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: 'order_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'NOTIFY_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: 'notify_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
      {
        name: 'SHIPPING_NAME',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:1234@some-rabbit:5672'],
          queue: 'shipping_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    JwtModule.register({
      global: true, // Ensure JwtModule is available globally
    }),
  ],
  controllers: [ProductController],
  providers: [],
})
export class AppModule {}
