-- AlterTable
ALTER TABLE `categories` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `products` MODIFY `active` BOOLEAN NOT NULL DEFAULT false;
