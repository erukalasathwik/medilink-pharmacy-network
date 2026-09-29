package com.medilink.backend.controller;
import com.medilink.backend.dto.*;
import com.medilink.backend.service.MediLinkService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/inventory")
public class InventoryController {
    private final MediLinkService service;
    public InventoryController(MediLinkService service){this.service=service;}
    @GetMapping public List<InventoryResponse> all(){return service.allInventory();}
    @PutMapping("/{id}") public InventoryResponse update(@PathVariable Long id,@Valid @RequestBody InventoryUpdateRequest request){return service.updateInventory(id,request.quantity());}
}
