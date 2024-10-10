import { Body, Controller, Get, Headers, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';

import { JwtService } from '@nestjs/jwt'

@Controller('product')
export class ProductController {
    constructor(
        private jwtService: JwtService,

        // @Inject("PRODUCT_NAME") private productSerivce: ClientProxy,
        @Inject("ORDER_NAME") private orderSerivce: ClientProxy,
        @Inject("NOTIFY_NAME") private notifySerivce: ClientProxy,
        @Inject("SHIPPING_NAME") private shippingSerivce: ClientProxy,

    ) { }

    // @Get("/get-all")
    // async getProduct() {

    //     let listProduct = await lastValueFrom(
    //         this.productSerivce.send("get-all-product", { id: 69 })
    //             .pipe(
    //                 timeout(2000),
    //                 retry(3),
    //                 catchError(err => {
    //                     //ghi log
    //                     return of("Service Product request timeout, please try again !")
    //                 })
    //             )

    //     ) // gửi message queue cho service

    //     // let listProductPro = lastValueFrom(this.productSerivce.send("get-all-product", { id: 69 })) // gửi message queue cho service

    //     // listProductPro.then().catch().finally()

    //     // let listProduct = this.productSerivce.send("get-all-product", { id: 69 })

    //     // listProduct.subscribe({
    //     //     next: (result) => { console.log(result) },
    //     //     error: (error) => { console.log(error) },
    //     //     complete: () => { }
    //     // })
    //     console.log(listProduct)
    //     return listProduct
    // }

    @Post("/order")
    async order(@Headers("token") token, @Body() model) {
        let decode = this.jwtService.decode(token);


        let newOrder = {
            user_id: decode.userId,
            email: model.email,
            list_product: model.list_product,
            full_name: model.full_name,
            phone: model.phone,
            address: model.address
        }

        // gọi send mail
        this.notifySerivce.emit("MAIL_INFO_NAME", newOrder)


        // gọi order
        let orderResult = await lastValueFrom(this.orderSerivce.send("ORDER_PRODUCT_NAME", newOrder))

        if (orderResult != null) {
            // shipping
            this.shippingSerivce.emit("SHIP_PRODUCT_NAME", { ...newOrder, order_id: orderResult.order_id })
        }



        return "Success"
    }

    @Get("/save-cache")
    async saveCache() {
        return await this.orderSerivce.send("SAVE_CACHE", "")
    }



    @Get("/delete-cache")
    async deleteCache() {
        return await this.orderSerivce.send("DELETE_CACHE", "")
    }

}