import { $Enums } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';


export class BlockItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  blockListId: number;

  @ApiProperty({
    enum: [$Enums.block_item_type.WebSite, $Enums.block_item_type.KeyWord],
  })
  type: $Enums.block_item_type;

  @ApiProperty()
  data: string;

  @ApiProperty()
  createdAt: Date;
}

export class BlockListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;

  @ApiProperty({ type: [BlockItemDto] })
  items?: BlockItemDto[];
}

export class BlockListQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q?: string;
}

export class AddBlockItemDto {
  @ApiProperty({
    enum: [$Enums.block_item_type.WebSite, $Enums.block_item_type.KeyWord],
  })
  @IsIn([$Enums.block_item_type.WebSite, $Enums.block_item_type.KeyWord])
  type: $Enums.block_item_type;

  @ApiProperty()
  data: string;
}


