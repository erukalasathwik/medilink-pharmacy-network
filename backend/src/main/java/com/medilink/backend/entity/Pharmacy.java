package com.medilink.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pharmacies")
public class Pharmacy {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String address;
    private String city;
    private String phone;
    private Double latitude;
    private Double longitude;
    private Double rating;
    private Integer reviewCount;
    private String imageUrl;
    private boolean verified = true;
    private boolean active = true;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Pharmacy() {}
    public Pharmacy(String name, String address, String city, String phone, Double latitude, Double longitude, Double rating, Integer reviewCount, String imageUrl) {
        this.name=name; this.address=address; this.city=city; this.phone=phone; this.latitude=latitude; this.longitude=longitude; this.rating=rating; this.reviewCount=reviewCount; this.imageUrl=imageUrl;
    }
    public Long getId(){return id;} public String getName(){return name;} public void setName(String v){name=v;}
    public String getAddress(){return address;} public void setAddress(String v){address=v;} public String getCity(){return city;} public void setCity(String v){city=v;}
    public String getPhone(){return phone;} public void setPhone(String v){phone=v;} public Double getLatitude(){return latitude;} public void setLatitude(Double v){latitude=v;}
    public Double getLongitude(){return longitude;} public void setLongitude(Double v){longitude=v;} public Double getRating(){return rating;} public void setRating(Double v){rating=v;}
    public Integer getReviewCount(){return reviewCount;} public void setReviewCount(Integer v){reviewCount=v;} public String getImageUrl(){return imageUrl;} public void setImageUrl(String v){imageUrl=v;}
    public boolean isVerified(){return verified;} public void setVerified(boolean v){verified=v;} public boolean isActive(){return active;} public void setActive(boolean v){active=v;}
    public LocalDateTime getCreatedAt(){return createdAt;}
}
