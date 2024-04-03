-- CreateEnum
CREATE TYPE "block_item_type" AS ENUM ('WebSite', 'KeyWord');

-- CreateTable
CREATE TABLE "client_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "client_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account_user" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "isBlockingEnabled" BOOLEAN NOT NULL,

    CONSTRAINT "account_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "block_list" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "block_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "block_item" (
    "id" SERIAL NOT NULL,
    "blockListId" INTEGER NOT NULL,
    "type" "block_item_type" NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "block_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_users_email_key" ON "client_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "account_user_ownerId_key" ON "account_user"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "block_list_ownerId_key" ON "block_list"("ownerId");

-- AddForeignKey
ALTER TABLE "account_user" ADD CONSTRAINT "account_user_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "client_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block_list" ADD CONSTRAINT "block_list_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "client_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "block_item" ADD CONSTRAINT "block_item_blockListId_fkey" FOREIGN KEY ("blockListId") REFERENCES "block_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
