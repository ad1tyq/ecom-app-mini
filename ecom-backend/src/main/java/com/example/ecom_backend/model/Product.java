package com.example.ecom_backend.model;

import java.math.BigDecimal;
import java.sql.Date;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Data;

@Entity
@Data
@Component
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private String desc;
  private String brand;
  private BigDecimal price;
  private String category;
  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
  private Date releaseDate;
  private boolean available;
  private int quantity;

  private String imageName;
  private String imageType;
  @Lob
  private byte[] imageData;

  public Product() {
  }

  public Product(int id, String name, String desc, String brand, BigDecimal price, String category, Date releaseDate,
      boolean available, int quantity, String imageName, String imageType, byte[] imageData) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.brand = brand;
    this.price = price;
    this.category = category;
    this.releaseDate = releaseDate;
    this.available = available;
    this.quantity = quantity;
    this.imageName = imageName;
    this.imageType = imageType;
    this.imageData = imageData;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDesc() {
    return desc;
  }

  public void setDesc(String desc) {
    this.desc = desc;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public boolean getAvailable() {
    return available;
  }

  public void setAvailable(boolean available) {
    this.available = available;
  }

  public Date getReleaseDate() {
    return releaseDate;
  }

  public void setReleaseDate(Date date) {
    this.releaseDate = date;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }

  public String getImageName() {
    return imageName;
  }

  public void setImageName(String imageName) {
    this.imageName = imageName;
  }

  public String getImageType() {
    return imageType;
  }

  public void setImageType(String imageType) {
    this.imageType = imageType;
  }

  public byte[] getImageData() {
    return imageData;
  }

  public void setImageData(byte[] imageData) {
    this.imageData = imageData;
  }

  @Override
  public String toString() {
    return "Product{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", desc='" + desc + '\'' +
        ", brand='" + brand + '\'' +
        ", price=" + price +
        ", category='" + category + '\'' +
        ", releaseDate='" + releaseDate + '\'' +
        ", available=" + available +
        ", quantity=" + quantity +
        '}';
  }

}
