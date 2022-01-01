import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CompanyController } from './domain/company/company.controller';

import { CompanyModule } from './domain/company/company.module';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [CompanyModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CompanyController);
  }
}
