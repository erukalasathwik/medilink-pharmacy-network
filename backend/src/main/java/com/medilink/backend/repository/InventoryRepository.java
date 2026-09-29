package com.medilink.backend.repository;
import com.medilink.backend.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface InventoryRepository extends JpaRepository<Inventory,Long>{
    List<Inventory> findByMedicineId(Long medicineId);
    List<Inventory> findByPharmacyId(Long pharmacyId);
    Optional<Inventory> findByPharmacyIdAndMedicineId(Long pharmacyId,Long medicineId);
}
