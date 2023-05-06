package com.example.spe_major.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Bid {

    @Id
    @GeneratedValue
    private int bidId;

    @OneToOne
    private Category category;

    private int quantity;

    @Column(nullable = false)
    private int basePrice;

    private int finalCustomerId;

    @Column(nullable = false)
    private String expiryDate;

    private String status;

    private int currentMaxBid;

    @OneToMany
    @JsonIgnore
    private List<CustomerBid> customerBidList;

    @ManyToOne
    private Farmer farmer;

}
