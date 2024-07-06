import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email/email.service';
import { SubscriptionModule } from './subscription/subscription.module';
import { AppJwtModule } from './jwt/jwt.module';
import { Subscription } from './subscription/subscription.entity';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'subscriptions',
      host: 'localhost',
      port: 5432,
      password: 'caclepg',
      username: 'postgres',
      entities: [Subscription],
      synchronize: true,
    }),

    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,
    SubscriptionModule,
    AppJwtModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
