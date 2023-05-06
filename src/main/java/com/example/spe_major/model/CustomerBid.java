package com.example.spe_major.model;

import jakarta.persistence.*;

@Entity
public class CustomerBid {

    @Id
    @GeneratedValue
    private int customerBidId;

    @ManyToOne
    private Bid bid;

    @ManyToOne
    private Customer customer;

    private int price;

}
