package com.medilink.backend.dto;
import jakarta.validation.constraints.Min;
public record InventoryUpdateRequest(@Min(0) Integer quantity) {}
