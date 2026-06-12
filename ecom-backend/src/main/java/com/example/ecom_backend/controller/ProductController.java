package com.example.ecom_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ecom_backend.model.Product;
import com.example.ecom_backend.service.ProductService;
import java.util.*;

@RestController
@RequestMapping("/api")
public class ProductController {

  @Autowired
  ProductService service;

  @GetMapping("/")
  public ResponseEntity<List<Product>> getProduct() {
    return new ResponseEntity<>(service.getProduct(), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Product> getProductById(@PathVariable int id) {
    Product prod = service.getProductById(id);
    if (prod != null)
      return new ResponseEntity<>(prod, HttpStatus.OK);
    else
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  @GetMapping("/category={category}")
  public List<Product> getProductByCategory(@PathVariable String category) {
    return service.getProductByCategory(category);
  }

  @GetMapping("/{id}/image")
  public ResponseEntity<byte[]> getImageById(@PathVariable int id) {
    Product product = service.getProductById(id);
    byte[] imageFile = product.getImageData();

    return ResponseEntity.ok()
        .contentType(MediaType.valueOf(product.getImageType()))
        .body(imageFile);
  }

  @GetMapping("/search")
  public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
    System.out.println("searching for keyword: " + keyword);
    List<Product> product = service.searchProducts(keyword);
    return new ResponseEntity<>(product, HttpStatus.OK);
  }

  @PostMapping("/addProduct")
  public ResponseEntity<?> addProduct(@RequestPart Product prod, @RequestPart MultipartFile imgFile) {
    try {
      Product product = service.postProduct(prod, imgFile);
      return new ResponseEntity<>(product, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/updateProduct")
  public ResponseEntity<?> putProduct(@RequestPart Product prod, @RequestPart(required = false) MultipartFile imgFile) {
    try {
      Product product = service.putProduct(prod, imgFile);
      return new ResponseEntity<>(product, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public void deleteProduct(@PathVariable int id) {
    service.deleteProduct(id);
  }

}
