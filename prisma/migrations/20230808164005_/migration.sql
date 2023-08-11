-- CreateIndex
CREATE FULLTEXT INDEX `Comment_text_idx` ON `Comment`(`text`);

-- CreateIndex
CREATE FULLTEXT INDEX `Item_name_idx` ON `Item`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `List_name_idx` ON `List`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `Tag_name_idx` ON `Tag`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `User_name_idx` ON `User`(`name`);
