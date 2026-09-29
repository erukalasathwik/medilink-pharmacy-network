package com.medilink.backend.controller;
import com.medilink.backend.dto.InventoryResponse;
import com.medilink.backend.service.MediLinkService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api")
public class MedicineController {
    private final MediLinkService service; public MedicineController(MediLinkService service){this.service=service;}
    @GetMapping("/medicines") public List<InventoryResponse> all(){return service.allInventory();}
    @GetMapping("/search/medicines") public List<InventoryResponse> search(@RequestParam(defaultValue="") String q){return service.search(q);}
}
