package com.medilink.backend.controller;
import com.medilink.backend.dto.InquiryRequest; import com.medilink.backend.entity.Inquiry; import com.medilink.backend.repository.InquiryRepository; import com.medilink.backend.service.MediLinkService;
import jakarta.validation.Valid; import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/inquiries")
public class InquiryController {
    private final MediLinkService service; private final InquiryRepository repo;
    public InquiryController(MediLinkService service,InquiryRepository repo){this.service=service;this.repo=repo;}
    @PostMapping public Inquiry create(@Valid @RequestBody InquiryRequest request){return service.createInquiry(request);}
    @GetMapping public List<Inquiry> all(){return repo.findAll();}
}
