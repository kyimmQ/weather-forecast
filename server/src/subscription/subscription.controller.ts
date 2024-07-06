// subscription.controller.ts
import { Controller, Post, Body, Delete, Query, Get } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionDTO } from './dto/subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async subscribe(@Body() subscriptionDto: SubscriptionDTO) {
    try {
      await this.subscriptionService.subscribe(
        subscriptionDto.email,
        subscriptionDto.city,
      );
      return {
        status: 'SUCCESS',
      };
    } catch (error) {
      return {
        status: 'ERROR',
        error: error,
      };
    }
  }

  @Delete()
  async unsubscribe(@Body('email') email: string, @Body('city') city: string) {
    try {
      await this.subscriptionService.unsubscribe(email, city);
      return {
        status: 'SUCCESS',
      };
    } catch (error) {
      return {
        status: 'ERROR',
      };
    }
  }

  @Get()
  async confirm(@Query('token') token: string) {
    try {
      await this.subscriptionService.confirmSubscription(token);
      return 'Successful';
    } catch (error) {
      return 'ERROR';
    }
  }
}
