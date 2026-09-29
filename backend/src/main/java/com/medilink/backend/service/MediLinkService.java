package com.medilink.backend.service;

import com.medilink.backend.dto.*;
import com.medilink.backend.entity.*;
import com.medilink.backend.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;

@Service
public class MediLinkService {
    private final PharmacyRepository pharmacies; private final MedicineRepository medicines; private final InventoryRepository inventory; private final InquiryRepository inquiries;
    public MediLinkService(PharmacyRepository pharmacies,MedicineRepository medicines,InventoryRepository inventory,InquiryRepository inquiries){this.pharmacies=pharmacies;this.medicines=medicines;this.inventory=inventory;this.inquiries=inquiries;}

    public List<InventoryResponse> search(String q){
        String term=q==null?"":q.trim();
        List<Inventory> rows=term.isBlank()?inventory.findAll():medicines.findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(term,term).stream().flatMap(m->inventory.findByMedicineId(m.getId()).stream()).toList();
        return rows.stream().map(this::toResponse).toList();
    }
    public List<InventoryResponse> allInventory(){return inventory.findAll().stream().map(this::toResponse).toList();}
    public List<InventoryResponse> pharmacyInventory(Long id){return inventory.findByPharmacyId(id).stream().map(this::toResponse).toList();}
    public List<PharmacySummary> allPharmacies(){return pharmacies.findAll().stream().map(p->new PharmacySummary(p.getId(),p.getName(),p.getAddress(),p.getCity(),p.getPhone(),p.getRating(),p.getReviewCount(),p.getImageUrl(),p.isVerified())).toList();}
    public Pharmacy getPharmacy(Long id){return pharmacies.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Pharmacy not found"));}
    public InventoryResponse updateInventory(Long id, Integer quantity){
        Inventory row=inventory.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Inventory record not found"));
        row.setQuantity(Math.max(0,quantity)); row.setStatus(statusFor(row.getQuantity())); row.touch(); return toResponse(inventory.save(row));
    }
    public Inquiry createInquiry(InquiryRequest request){
        Pharmacy p=getPharmacy(request.pharmacyId()); Medicine m=medicines.findById(request.medicineId()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Medicine not found"));
        return inquiries.save(new Inquiry(p,m,request.message(),request.contactMethod()));
    }
    public Map<String,Object> stats(){
        long total=inventory.count(), available=inventory.findAll().stream().filter(x->x.getStatus()==AvailabilityStatus.AVAILABLE).count(), low=inventory.findAll().stream().filter(x->x.getStatus()==AvailabilityStatus.LOW_STOCK).count(), out=inventory.findAll().stream().filter(x->x.getStatus()==AvailabilityStatus.OUT_OF_STOCK).count();
        return Map.of("pharmacies",pharmacies.count(),"medicines",medicines.count(),"inventoryRecords",total,"available",available,"lowStock",low,"outOfStock",out,"newInquiries",inquiries.countByStatus(InquiryStatus.NEW));
    }
    private InventoryResponse toResponse(Inventory x){Medicine m=x.getMedicine();Pharmacy p=x.getPharmacy();return new InventoryResponse(x.getId(),p.getId(),p.getName(),p.getAddress(),p.getImageUrl(),p.getRating(),p.getReviewCount(),m.getId(),m.getName(),m.getStrength(),m.getDosageForm(),x.getQuantity(),x.getStatus(),x.getUpdatedAt());}
    public static AvailabilityStatus statusFor(int quantity){return quantity<=0?AvailabilityStatus.OUT_OF_STOCK:quantity<=10?AvailabilityStatus.LOW_STOCK:AvailabilityStatus.AVAILABLE;}
}
