package com.medilink.backend.config;

import com.medilink.backend.entity.*; import com.medilink.backend.repository.*; import com.medilink.backend.service.MediLinkService;
import org.springframework.boot.CommandLineRunner; import org.springframework.context.annotation.Bean; import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {
 @Bean CommandLineRunner seed(PharmacyRepository p, MedicineRepository m, InventoryRepository i){return args->{
  if(p.count()>0 || m.count()>0) return;
  Pharmacy p1=p.save(new Pharmacy("MediPlus Pharmacy","12-B, Banjara Hills","Hyderabad","+91 98765 43210",17.4156,78.4347,4.5,124,"https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=700&q=80"));
  Pharmacy p2=p.save(new Pharmacy("HealthCare Pharmacy","Road No. 36, Jubilee Hills","Hyderabad","+91 98765 43211",17.4319,78.4072,4.4,98,"https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=700&q=80"));
  Pharmacy p3=p.save(new Pharmacy("Medico Plus","KPHB Colony","Hyderabad","+91 98765 43212",17.4948,78.3996,4.3,76,"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80"));
  Medicine par=m.save(new Medicine("Paracetamol","Paracetamol","500 mg","Tablet","Crocin"));
  Medicine am=m.save(new Medicine("Amoxicillin","Amoxicillin","500 mg","Capsule","Mox"));
  Medicine ibu=m.save(new Medicine("Ibuprofen","Ibuprofen","400 mg","Tablet","Brufen"));
  Medicine cet=m.save(new Medicine("Cetirizine","Cetirizine","10 mg","Tablet","Cetirizine"));
  i.save(new Inventory(p1,par,120,MediLinkService.statusFor(120))); i.save(new Inventory(p2,par,8,MediLinkService.statusFor(8))); i.save(new Inventory(p3,par,0,MediLinkService.statusFor(0)));
  i.save(new Inventory(p1,am,24,MediLinkService.statusFor(24))); i.save(new Inventory(p2,ibu,0,MediLinkService.statusFor(0))); i.save(new Inventory(p3,ibu,45,MediLinkService.statusFor(45))); i.save(new Inventory(p1,cet,18,MediLinkService.statusFor(18))); i.save(new Inventory(p2,cet,6,MediLinkService.statusFor(6)));
 };}
}
