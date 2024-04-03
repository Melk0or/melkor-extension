import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [DbModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService]
})
export class AccountModule {}
