import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  sendMailInfoOrder(data) {
    let { email, full_name } = data

    let configMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sangrom2003@gmail.com",
        pass: "vzgvpxxqfjynrwfy"
      }
    })


    let infoMail = {
      from: "sangrom2003@gmail.com",
      to: email, // "khaitruong2112@gmail.com"
      subject: `Đã đặt hàng qua Amazon - ${full_name} - ${email}`,
      html: "<h1> Xác nhận đợn hàng thành công NEW </h1>"
    }

    configMail.sendMail(infoMail, error => error);
  }

  sendMailSuccessOrder(data) {
    let { email, full_name } = data

    let configMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sangrom2003@gmail.com",
        pass: "vzgvpxxqfjynrwfy"
      }
    })


    let infoMail = {
      from: "sangrom2003@gmail.com",
      to: email, // "khaitruong2112@gmail.com"
      subject: `Đã đặt hàng qua Amazon - ${full_name} - ${email}`,
      html: "<h1 style='color:red'> Đặt hàng thành công NEW </h1>"
    }

    configMail.sendMail(infoMail, error => error);
  }

}
