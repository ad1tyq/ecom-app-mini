package com.example.ecom_backend.service;

import java.io.IOException;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecom_backend.model.Product;
import com.example.ecom_backend.repo.ProductRepo;

@Service
@Component
public class ProductService {

  @Autowired
  ProductRepo repo;

  // GET
  public List<Product> getProduct() {
    return repo.findAll();
  }

  // GET
  public Product getProductById(int id) {
    return repo.findById(id).orElse(new Product());
  }

  // GET
  public List<Product> getProductByCategory(String category) {
    return repo.findByCategory(category);
  }

  // GET
  public List<Product> searchProducts(String keyword) {
    return repo.searchProducts(keyword);
  }

  // POST
  public Product postProduct(Product product, MultipartFile imgFile) throws IOException {
    product.setImageName(imgFile.getOriginalFilename());
    product.setImageType(imgFile.getContentType());
    product.setImageData(imgFile.getBytes());
    return repo.save(product);
  }

  // put
  public Product putProduct(Product product, MultipartFile imgFile) throws IOException {
    if (imgFile != null && !imgFile.isEmpty()) {
      product.setImageName(imgFile.getOriginalFilename());
      product.setImageType(imgFile.getContentType());
      product.setImageData(imgFile.getBytes());
    } else {
      Product existingProduct = repo.findById(product.getId()).orElse(null);
      if (existingProduct != null) {
        product.setImageName(existingProduct.getImageName());
        product.setImageType(existingProduct.getImageType());
        product.setImageData(existingProduct.getImageData());
      }
    }
    return repo.save(product);
  }

  // DELETE
  public void deleteProduct(int id) {
    repo.deleteById(id);
  }
}
