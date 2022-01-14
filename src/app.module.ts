import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
import { CompanyModule } from './domain/company/company.module';

import { CompanyController } from './domain/company/company.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [AuthModule, CompanyModule, S3Module],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CompanyController);
  }
}
