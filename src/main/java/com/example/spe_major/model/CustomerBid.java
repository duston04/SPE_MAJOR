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

    public CustomerBid() {
    }

    public CustomerBid(int customerBidId, Bid bid, Customer customer, int price) {
        this.customerBidId = customerBidId;
        this.bid = bid;
        this.customer = customer;
        this.price = price;
    }

    public int getCustomerBidId() {
        return customerBidId;
    }

    public void setCustomerBidId(int customerBidId) {
        this.customerBidId = customerBidId;
    }

    public Bid getBid() {
        return bid;
    }

    public void setBid(Bid bid) {
        this.bid = bid;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "CustomerBid{" +
                "customerBidId=" + customerBidId +
                ", bid=" + bid +
                ", customer=" + customer +
                ", price=" + price +
                '}';
    }
}
