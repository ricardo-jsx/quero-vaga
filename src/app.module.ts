import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { S3Module } from './s3/s3.module';
import { CompanyModule } from './domain/company/company.module';
import { CommonModule } from './common/common.module';

import { CompanyController } from './domain/company/company.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { JobOpportunityModule } from './domain/job-opportunity/job-opportunity.module';

@Module({
  imports: [
    AuthModule,
    CompanyModule,
    JobOpportunityModule,
    S3Module,
    CommonModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CompanyController);
  }
}
