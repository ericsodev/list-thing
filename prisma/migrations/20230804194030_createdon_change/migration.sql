/*
  Warnings:

  - You are about to drop the column `dateAdded` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `dateAdded` on the `Item` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Comment_itemId_dateAdded_idx` ON `Comment`;

-- DropIndex
DROP INDEX `Item_listId_dateAdded_idx` ON `Item`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `dateAdded`,
    ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Item` DROP COLUMN `dateAdded`,
    ADD COLUMN `createdOn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `Comment_itemId_createdOn_idx` ON `Comment`(`itemId`, `createdOn`);

-- CreateIndex
CREATE INDEX `Item_listId_createdOn_idx` ON `Item`(`listId`, `createdOn`);
