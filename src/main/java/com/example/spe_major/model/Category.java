package com.example.spe_major.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Category {
    
    @Id
    @GeneratedValue
    private int categoryId;
    
    @Column(unique = true)
    private String type;
    
    @Column(unique = true)
    private String subcategory;

    @OneToOne
    @JsonIgnore
    private Bid bid;
}
