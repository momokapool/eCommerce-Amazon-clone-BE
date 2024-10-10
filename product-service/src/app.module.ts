import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PrismaModule],
  controllers: [ProductController],
  providers: [],
})
export class AppModule { }
