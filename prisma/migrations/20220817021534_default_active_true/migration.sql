-- AlterTable
ALTER TABLE `categories` MODIFY `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `products` MODIFY `active` BOOLEAN NOT NULL DEFAULT true;
