import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(
    private prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  async order(data) {
    try {
      let { user_id, list_product } = data
      let newOrder = {
        user_id: user_id,
        list_product: JSON.parse(list_product),
        create_at: new Date()
      }
      let orderResult = await this.prismaService.orders.create({ data: newOrder })

      return orderResult;
    } catch {
      return null
    }

  }


  async saveCache() {
    let dataCache = await this.cacheManager.get("order");

    if (dataCache) {
      console.log("lấy từ cache")
      return dataCache
    }

    let data = await this.prismaService.orders.findMany()

    this.cacheManager.set("order", data)

    return data

  }

  deleteCache() {
    this.cacheManager.reset()
    return "Đã xóa cache"
  }
}
