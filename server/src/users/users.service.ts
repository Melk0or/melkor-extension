import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { BlockListService } from 'src/block-list/block-list.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UsersService {
  constructor(
    private accountService: AccountService,
    private dbService: DbService,
    private blockListService: BlockListService
  ) {}

  findByEmail(email: string) {
    return this.dbService.client_users.findFirst({ where: { email } });
  }

  async createUser(email: string, hash: string, salt: string) {
    const user = await this.dbService.client_users.create({
      data: { email, hash, salt },
    });
    await this.accountService.createAccount(user.id);
    await this.blockListService.createBlockList(user.id);
    return user;
  }
}
