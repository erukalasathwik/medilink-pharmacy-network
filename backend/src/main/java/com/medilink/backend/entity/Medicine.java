package com.medilink.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "medicines")
public class Medicine {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false) private String name;
    private String genericName;
    private String strength;
    private String dosageForm;
    private String brand;
    private boolean active = true;

    public Medicine() {}
    public Medicine(String name,String genericName,String strength,String dosageForm,String brand){this.name=name;this.genericName=genericName;this.strength=strength;this.dosageForm=dosageForm;this.brand=brand;}
    public Long getId(){return id;} public String getName(){return name;} public void setName(String v){name=v;} public String getGenericName(){return genericName;} public void setGenericName(String v){genericName=v;}
    public String getStrength(){return strength;} public void setStrength(String v){strength=v;} public String getDosageForm(){return dosageForm;} public void setDosageForm(String v){dosageForm=v;}
    public String getBrand(){return brand;} public void setBrand(String v){brand=v;} public boolean isActive(){return active;} public void setActive(boolean v){active=v;}
}
