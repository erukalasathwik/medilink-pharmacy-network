package com.medilink.backend.dto;
import com.medilink.backend.entity.*;
import java.time.LocalDateTime;
public record InventoryResponse(Long id, Long pharmacyId, String pharmacyName, String address, String imageUrl, Double rating, Integer reviewCount, Long medicineId, String medicineName, String strength, String dosageForm, Integer quantity, AvailabilityStatus status, LocalDateTime updatedAt) {}
