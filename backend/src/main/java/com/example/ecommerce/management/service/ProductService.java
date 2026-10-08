package com.example.ecommerce.management.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.ecommerce.management.entity.Product;
import com.example.ecommerce.management.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;
public List<Object[]> getProductsWithCategory() {
    return productRepository.findProductsWithCategory();
}
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Integer id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
    public List<Product> getProductsAboveAveragePrice() {
    return productRepository.findProductsAboveAveragePrice();
}
public Double getAveragePrice() {
    return productRepository.findAveragePrice();
}
}