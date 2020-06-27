import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RbacInterceptor } from '../../interceptor/rbac.interceptor';
import { CommodityService } from './commodity.service';
import { request } from 'express';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}
  /**
   * list
   * @param body
   */
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(3))
  @Post('list')
  async queryCommodityList(@Body() body: any) {
    return await this.commodityService.queryCommodityList(body);
  }

  /**
   * add
   * @param body
   * @param req
   */
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(2))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req) {
    return await this.commodityService.createCommodity(body, req.user.username);
  }
  /**
   * update
   * @param body
   * @param req
   */
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(2))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.updateCommodity(body, req.user.username);
  }

  /**
   * delete
   * @param body
   */
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(new RbacInterceptor(1))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body);
  }
}
