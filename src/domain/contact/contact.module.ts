import { Module } from '@nestjs/common';

import { CommonModule } from '@app/common/common.module';

import { ContactService } from './contact.service';

@Module({
  imports: [CommonModule],
  exports: [ContactService],
  providers: [ContactService],
})
export class ContactModule {}
