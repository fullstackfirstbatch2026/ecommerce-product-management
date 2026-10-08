package com.example.ecommerce.management.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.ecommerce.management.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = """
            SELECT p.product_id,
                   p.name AS product_name,
                   p.price,
                   p.stock,
                   c.name AS category_name
            FROM products p
            JOIN categories c
                ON p.category_id = c.category_id
            """, nativeQuery = true)
    List<Object[]> findProductsWithCategory();

    @Query(value = """
            SELECT *
            FROM products
            WHERE price > (
                SELECT AVG(price)
                FROM products
            )
            """, nativeQuery = true)
    List<Product> findProductsAboveAveragePrice();

    @Query(value = """
            SELECT AVG(price)
            FROM products
            """, nativeQuery = true)
    Double findAveragePrice();
}