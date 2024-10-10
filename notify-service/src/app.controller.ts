import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern("MAIL_INFO_NAME")
  sendMailInfoOrder(@Payload() data){
    return this.appService.sendMailInfoOrder(data)
  }

  @EventPattern("MAIL_SUCCESS_NAME")
  sendMailSuccessOrder(@Payload() data){
    return this.appService.sendMailSuccessOrder(data)
  }

}
