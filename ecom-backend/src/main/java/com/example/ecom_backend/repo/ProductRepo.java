package com.example.ecom_backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.example.ecom_backend.model.Product;

@Repository
@Component
public interface ProductRepo extends JpaRepository<Product, Integer> {
  List<Product> findByCategory(String category);

  @Query("SELECT p from Product p WHERE " +
      "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
      "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
      "LOWER(p.desc) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
      "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%'))")
  List<Product> searchProducts(String keyword);
}
