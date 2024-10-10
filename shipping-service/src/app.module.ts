import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PrismaModule,

  ClientsModule.register([{
    name: "NOTIFY_NAME",
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://admin:1234@some-rabbit:5672'],
      queue: 'notify_queue',
      queueOptions: {
        durable: false
      }
    }
  }]),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
