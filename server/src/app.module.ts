import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email/email.service';
import { SubscriptionModule } from './subscription/subscription.module';
import { AppJwtModule } from './jwt/jwt.module';
import { Subscription } from './subscription/subscription.entity';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    // for local
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //     ssl: {
    //       rejectUnauthorized: false,
    //     },
    //     database: new ConfigService().get<string>('DB_DATABASE'),
    //     host: new ConfigService().get<string>('DB_HOST'),
    //     port: Number(new ConfigService().get<string>('DB_PORT')),
    //     password: new ConfigService().get<string>('DB_USERNAME'),
    //     username: new ConfigService().get<string>('DB_PASSWORD'),
    //     entities: [Subscription],
    //     synchronize: true,
    // })
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        ssl: {
          rejectUnauthorized: false,
        },
        entities: [Subscription],
        url: `postgresql://${configService.get<string>('DB_USERNAME')}:${configService.get<string>('DB_PASSWORD')}@${configService.get<string>('DB_HOST')}`,
      }),
      inject: [ConfigService],
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
