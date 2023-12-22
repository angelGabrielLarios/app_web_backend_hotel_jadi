-- Active: 1702943187359@@127.0.0.1@3306@dic2023

use dic2023;

show TABLES;

SELECT * FROM users;

INSERT INTO
    shopping_cart (id, `userId`)
VALUES (
        'ed87b6e0-a02b-11ee-8c90-0242ac120002',
        'd565cc9c-b87d-4ce4-991b-e9c16b10c98b'
    );

SELECT * FROM products;

desc shopping_cart;

desc cart_details;

desc users;

select * from shopping_cart;

select * from shopping_cart;

/* delete from shopping_cart; */

SELECT * FROM cart_details;

SELECT *
FROM cart_details
WHERE
    `shoppingCartId` = '22f1108a-29d3-46b8-837a-8774df091a72';

/* DELETE FROM cart_details; */

SELECT *
FROM products
WHERE
    id = '025dbc6b-7212-44e7-9c8f-5a5b679749b0';

SELECT
    sc.id as `shoppingCartId`,
    cd.id AS cartDetailId,
    cd.quantity,
    p.id AS productId,
    p.name AS product_name,
    p.price AS unit_price, (p.price * cd.quantity) AS subtotal_by_product
FROM cart_details cd
    INNER JOIN products p ON cd.productId = p.id
    INNER JOIN shopping_cart sc ON cd.shoppingCartId = sc.id
WHERE
    sc.id = '22f1108a-29d3-46b8-837a-8774df091a72'
    and p.id = '4fc8baa1-65d1-4f62-ac09-c6bc3c59f627';

SELECT
    sc.id as `shoppingCartId`,
    cd.id AS cartDetailId,
    cd.quantity,
    p.id AS productId,
    p.name AS product_name,
    p.price AS unit_price, (p.price * cd.quantity) AS subtotal_by_product
FROM cart_details cd
    INNER JOIN products p ON cd.productId = p.id
    INNER JOIN shopping_cart sc ON cd.shoppingCartId = sc.id
WHERE sc.id = '22f1108a-29d3-46b8-837a-8774df091a72'

SELECT (p.price * cd.quantity) AS total_price
FROM cart_details cd
    INNER JOIN products p ON cd.productId = p.id
    INNER JOIN shopping_cart sc ON cd.shoppingCartId = sc.id
WHERE
    sc.id = '22f1108a-29d3-46b8-837a-8774df091a72'
    and p.id = '4fc8baa1-65d1-4f62-ac09-c6bc3c59f627';

desc cart_details;

desc shopping_cart;

desc products;

select * from cart_details;

SELECT
    sc.id,
    SUM(pd.price * cd.quantity) AS total
FROM cart_details cd
    JOIN products pd ON cd.productId = pd.id
    JOIN shopping_cart sc ON cd.id = sc.id
WHERE
    sc.id = '22f1108a-29d3-46b8-837a-8774df091a72'
GROUP BY sc.id;

SELECT
    sd.shoppingCartId,
    SUM(pd.price * cd.quantity) AS total
FROM cart_details cd
    JOIN products pd ON cd.productId = pd.id
    JOIN shopping_cart sd ON cd.shoppingCartId = sd.id
WHERE
    sd.id = '22f1108a-29d3-46b8-837a-8774df091a72'
GROUP BY sd.shoppingCartId;

SELECT
    sd.id AS shoppingCartId,
    SUM(pd.price * cd.quantity) AS total
FROM cart_details cd
    JOIN products pd ON cd.productId = pd.id
    JOIN shopping_cart sd ON cd.shoppingCartId = sd.id
WHERE
    sd.id = '22f1108a-29d3-46b8-837a-8774df091a72'
GROUP BY sd.id;

SELECT
    sd.id AS shoppingCartId,
    ROUND(SUM(pd.price * cd.quantity), 2) AS total
FROM cart_details cd
    JOIN products pd ON cd.productId = pd.id
    JOIN shopping_cart sd ON cd.shoppingCartId = sd.id
WHERE
    sd.id = '22f1108a-29d3-46b8-837a-8774df091a72'
GROUP BY sd.id;