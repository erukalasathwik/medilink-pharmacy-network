package com.medilink.backend.dto;
public record PharmacySummary(Long id,String name,String address,String city,String phone,Double rating,Integer reviewCount,String imageUrl,boolean verified) {}
