-- Table structure for table `cart-details`
--

DROP TABLE IF EXISTS `cart-details`;

CREATE TABLE
    `cart-details` (
        `id` varchar(36) NOT NULL,
        `quantity` int NOT NULL,
        `status` varchar(255) NOT NULL,
        `shoppingCartId` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `FK_5be2a393085bd08b6498e674910` (`shoppingCartId`),
        CONSTRAINT `FK_5be2a393085bd08b6498e674910` FOREIGN KEY (`shoppingCartId`) REFERENCES `shopping_cart` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `cart_details`;

CREATE TABLE
    `cart_details` (
        `id` varchar(36) NOT NULL,
        `quantity` int NOT NULL,
        `status` varchar(255) NOT NULL,
        `shoppingCartId` varchar(36) DEFAULT NULL,
        `productId` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `FK_2d7e11173ce3e587a296b0dafc3` (`shoppingCartId`),
        KEY `FK_213b59b40899244918966811c7d` (`productId`),
        CONSTRAINT `FK_213b59b40899244918966811c7d` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
        CONSTRAINT `FK_2d7e11173ce3e587a296b0dafc3` FOREIGN KEY (`shoppingCartId`) REFERENCES `shopping_cart` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `products`;

CREATE TABLE
    `products` (
        `id` varchar(36) NOT NULL,
        `name` varchar(100) NOT NULL,
        `description` text NOT NULL,
        `price` float NOT NULL,
        `amount` int NOT NULL,
        `sectionId` varchar(36) DEFAULT NULL,
        `imageURL` text,
        PRIMARY KEY (`id`),
        KEY `FK_a6f699e2287d19941ff7b557270` (`sectionId`),
        CONSTRAINT `FK_a6f699e2287d19941ff7b557270` FOREIGN KEY (`sectionId`) REFERENCES `sections` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `sections`;

CREATE TABLE
    `sections` (
        `id` varchar(36) NOT NULL,
        `name` varchar(100) NOT NULL,
        `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (`id`),
        UNIQUE KEY `IDX_b43359623c10ff3d0a199289b8` (`name`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `shopping_cart`;

;

CREATE TABLE
    `shopping_cart` (
        `id` varchar(36) NOT NULL,
        `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        `userId` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `FK_bee83828c1e181ac7ba97267ca2` (`userId`),
        CONSTRAINT `FK_bee83828c1e181ac7ba97267ca2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE
    `tokens` (
        `id` varchar(36) NOT NULL,
        `token` text NOT NULL,
        `userId` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`id`),
        KEY `FK_d417e5d35f2434afc4bd48cb4d2` (`userId`),
        CONSTRAINT `FK_d417e5d35f2434afc4bd48cb4d2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;

CREATE TABLE
    `users` (
        `id` varchar(36) NOT NULL,
        `firstName` varchar(100) NOT NULL,
        `lastName` varchar(100) NOT NULL,
        `email` varchar(120) NOT NULL,
        `phone` varchar(20) NOT NULL,
        `password` text NOT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;