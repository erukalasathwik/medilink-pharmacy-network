package com.medilink.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="inquiries")
public class Inquiry {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @ManyToOne(optional=false) private Pharmacy pharmacy;
    @ManyToOne(optional=false) private Medicine medicine;
    @Column(nullable=false, length=1000) private String message;
    @Column(nullable=false) private String contactMethod;
    @Enumerated(EnumType.STRING) private InquiryStatus status = InquiryStatus.NEW;
    private LocalDateTime createdAt = LocalDateTime.now();
    public Inquiry(){}
    public Inquiry(Pharmacy p, Medicine m, String msg, String method){pharmacy=p;medicine=m;message=msg;contactMethod=method;}
    public Long getId(){return id;} public Pharmacy getPharmacy(){return pharmacy;} public Medicine getMedicine(){return medicine;} public String getMessage(){return message;} public String getContactMethod(){return contactMethod;} public InquiryStatus getStatus(){return status;} public LocalDateTime getCreatedAt(){return createdAt;}
    public void setStatus(InquiryStatus s){status=s;}
}
