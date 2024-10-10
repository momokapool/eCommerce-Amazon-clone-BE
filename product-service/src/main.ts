import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';


// service product
async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      // url kết nối đến server RabbitMQ
      urls: ['amqp://admin:1234@localhost:5672'],
      // tên queue xử lý
      queue: 'product_queue',
      queueOptions: {
        // chế độ lưu trữ:
        // true: save - false not save, khi RabbitMQ restart
        durable: false
      }

    }
  });

  await app.listen();
}
bootstrap();
