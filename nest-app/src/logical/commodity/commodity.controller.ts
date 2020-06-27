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
import { RbacGuard } from '../../guard/rbac.guard';
import { CommodityService } from './commodity.service';
import { roleConstans } from '../auth/constants';

@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}
  /**
   * list
   * @param body
   */
  @UseGuards(new RbacGuard(roleConstans.HUMAN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(roleConstans.HUMAN))
  @Post('list')
  async queryCommodityList(@Body() body: any) {
    return await this.commodityService.queryCommodityList(body);
  }

  /**
   * add
   * @param body
   * @param req
   */
  @UseGuards(new RbacGuard(roleConstans.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(roleConstans.DEVELOPER))
  @Post('create')
  async createCommodity(@Body() body: any, @Request() req) {
    return await this.commodityService.createCommodity(body, req.user.username);
  }
  /**
   * update
   * @param body
   * @param req
   */
  @UseGuards(new RbacGuard(roleConstans.DEVELOPER))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(roleConstans.DEVELOPER))
  @Post('update')
  async updateCommodity(@Body() body: any, @Request() req: any) {
    return await this.commodityService.updateCommodity(body, req.user.username);
  }

  /**
   * delete
   * @param body
   */
  @UseGuards(new RbacGuard(roleConstans.ADMIN))
  @UseGuards(AuthGuard('jwt'))
  // @UseInterceptors(new RbacInterceptor(roleConstans.ADMIN))
  @Post('delete')
  async deleteCommodity(@Body() body: any) {
    return await this.commodityService.deleteCommodity(body);
  }
}
