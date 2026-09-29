package com.medilink.backend.controller;
import com.medilink.backend.service.MediLinkService; import org.springframework.web.bind.annotation.*; import java.util.Map;
@RestController @RequestMapping("/api/admin")
public class AdminController { private final MediLinkService service; public AdminController(MediLinkService service){this.service=service;} @GetMapping("/stats") public Map<String,Object> stats(){return service.stats();} }
