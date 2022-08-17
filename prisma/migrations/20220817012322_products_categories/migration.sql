/*
  Warnings:

  - Added the required column `active` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `products_id_key` ON `products`;

-- AlterTable
ALTER TABLE `products` ADD COLUMN `active` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `sales` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `fake` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produs_on_sales` (
    `productId` INTEGER NOT NULL,
    `saleId` BIGINT NOT NULL,
    `quantity` INTEGER NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`productId`, `saleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `returned_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `produs_on_sales` ADD CONSTRAINT `produs_on_sales_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produs_on_sales` ADD CONSTRAINT `produs_on_sales_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `returned_products` ADD CONSTRAINT `returned_products_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
