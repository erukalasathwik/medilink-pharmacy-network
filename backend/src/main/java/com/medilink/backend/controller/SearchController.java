package com.medilink.backend.controller;
import com.medilink.backend.dto.InventoryResponse;
import com.medilink.backend.service.MediLinkService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/search")
public class SearchController {
    private final MediLinkService service;
    public SearchController(MediLinkService service){this.service=service;}
    @GetMapping("/medicines") public List<InventoryResponse> medicines(@RequestParam(defaultValue="") String q){return service.search(q);}
    @GetMapping("/pharmacies") public List<InventoryResponse> pharmacies(@RequestParam(defaultValue="") String q){return service.search(q);}
}
