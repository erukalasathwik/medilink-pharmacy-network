package com.medilink.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "inventory", uniqueConstraints = @UniqueConstraint(columnNames = {"pharmacy_id", "medicine_id"}))
public class Inventory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional=false, fetch=FetchType.EAGER) private Pharmacy pharmacy;
    @ManyToOne(optional=false, fetch=FetchType.EAGER) private Medicine medicine;
    @Column(nullable=false) private Integer quantity;
    @Enumerated(EnumType.STRING) @Column(nullable=false) private AvailabilityStatus status;
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Inventory() {}
    public Inventory(Pharmacy p, Medicine m, Integer q, AvailabilityStatus s){pharmacy=p;medicine=m;quantity=q;status=s;}
    public Long getId(){return id;} public Pharmacy getPharmacy(){return pharmacy;} public Medicine getMedicine(){return medicine;} public Integer getQuantity(){return quantity;} public void setQuantity(Integer v){quantity=v;}
    public AvailabilityStatus getStatus(){return status;} public void setStatus(AvailabilityStatus v){status=v;} public LocalDateTime getUpdatedAt(){return updatedAt;} public void touch(){updatedAt=LocalDateTime.now();}
}
