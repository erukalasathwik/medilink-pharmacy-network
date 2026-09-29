package com.medilink.backend.repository;
import com.medilink.backend.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface MedicineRepository extends JpaRepository<Medicine,Long>{
    List<Medicine> findByNameContainingIgnoreCaseOrGenericNameContainingIgnoreCase(String name,String genericName);
}
