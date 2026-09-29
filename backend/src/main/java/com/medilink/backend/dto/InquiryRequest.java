package com.medilink.backend.dto;
import jakarta.validation.constraints.*;
public record InquiryRequest(@NotNull Long pharmacyId,@NotNull Long medicineId,@NotBlank @Size(max=1000) String message,@NotBlank String contactMethod) {}
