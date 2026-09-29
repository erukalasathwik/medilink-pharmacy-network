package com.medilink.backend.controller;
import com.medilink.backend.dto.*; import com.medilink.backend.entity.Pharmacy; import com.medilink.backend.service.MediLinkService;
import jakarta.validation.Valid; import org.springframework.web.bind.annotation.*; import java.util.List;
@RestController @RequestMapping("/api/pharmacies")
public class PharmacyController {
    private final MediLinkService service; public PharmacyController(MediLinkService service){this.service=service;}
    @GetMapping public List<PharmacySummary> all(){return service.allPharmacies();}
    @GetMapping("/{id}") public Pharmacy get(@PathVariable Long id){return service.getPharmacy(id);}
    @GetMapping("/{id}/inventory") public List<InventoryResponse> inventory(@PathVariable Long id){return service.pharmacyInventory(id);}
    @PostMapping("/inventory/{id}") public InventoryResponse postUpdate(@PathVariable Long id,@Valid @RequestBody InventoryUpdateRequest request){return service.updateInventory(id,request.quantity());}
    @PutMapping("/inventory/{id}") public InventoryResponse update(@PathVariable Long id,@Valid @RequestBody InventoryUpdateRequest request){return service.updateInventory(id,request.quantity());}
}
