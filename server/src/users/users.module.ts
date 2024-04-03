import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { BlockListModule } from 'src/block-list/block-list.module';
import { DbModule } from 'src/db/db.module';
import { UsersService } from './users.service';

@Module({
  imports: [DbModule, AccountModule, BlockListModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
