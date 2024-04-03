import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { AddBlockItemDto, BlockListQueryDto } from 'src/dto/block-list.dto';

@Injectable()
export class BlockListService {
  constructor(private dbService: DbService) {}

  createBlockList(userId: number) {
    return this.dbService.block_list.create({ data: { ownerId: userId } });
  }

  getByUser(userId: number, query: BlockListQueryDto) {
    return this.dbService.block_list.findUniqueOrThrow({
      where: { ownerId: userId },
      include: {
        items: {
          where: { data: { contains: query.q, mode: 'insensitive' } },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
  }

  async addBlockItem(userId: number, data: AddBlockItemDto) {
    const blockList = await this.dbService.block_list.findUniqueOrThrow({
      where: { ownerId: userId },
    });

    return this.dbService.block_item.create({
      data: { blockListId: blockList.id, ...data },
    });
  }

  async removeBlockItem(userId: number, itemId: number) {
    const blockList = await this.dbService.block_list.findUniqueOrThrow({
        where: { ownerId: userId },
      });

    return this.dbService.block_item.delete({where: {blockListId: blockList.id, id: itemId}})
  }
}
