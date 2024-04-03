import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PatchAccountDto } from 'src/dto/account.dto';

@Injectable()
export class AccountService {
  constructor(private dbService: DbService) {}

  async getAccount(userId: number) {
    return this.dbService.account_user.findUniqueOrThrow({
      where: { ownerId: userId },
    });
  }

  async patchAccount(userId: number, patch: PatchAccountDto) {
    return this.dbService.account_user.update({
      where: { ownerId: userId },
      data: { ...patch },
    });
  }

  async createAccount(userId: number) {
    return this.dbService.account_user.create({
      data: { ownerId: userId, isBlockingEnabled: false },
    });
  }
}
