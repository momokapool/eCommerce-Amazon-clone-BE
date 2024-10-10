import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern("ORDER_PRODUCT_NAME")
  order(@Payload() data) {
    return this.appService.order(data);
  }

  @MessagePattern("SAVE_CACHE")
  saveCache(){
    return this.appService.saveCache();
  }

  @MessagePattern("DELETE_CACHE")
  deleteCache(){
    return this.appService.deleteCache();

  }
}
