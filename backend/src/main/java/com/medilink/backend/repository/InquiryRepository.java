package com.medilink.backend.repository;
import com.medilink.backend.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InquiryRepository extends JpaRepository<Inquiry,Long>{long countByStatus(com.medilink.backend.entity.InquiryStatus status);}
