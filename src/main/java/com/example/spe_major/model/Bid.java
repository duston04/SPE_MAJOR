package com.example.spe_major.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Bid {

    @Id
    @GeneratedValue
    private int bidId;

    @ManyToOne
    private Category category;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private int basePrice;

    @OneToOne
    private Customer finalCustomer;

    @Column(nullable = false)
    private String expiryDate;

    private String status;

    private int currentMaxBid;

    @OneToMany
    @JsonIgnore
    private List<CustomerBid> customerBidList;

    @ManyToOne
    private Farmer farmer;

    public Bid() {
    }

    public Bid(int bidId, Category category, int quantity, int basePrice, Customer finalCustomer, String expiryDate, String status, int currentMaxBid, List<CustomerBid> customerBidList, Farmer farmer) {
        this.bidId = bidId;
        this.category = category;
        this.quantity = quantity;
        this.basePrice = basePrice;
        this.finalCustomer = finalCustomer;
        this.expiryDate = expiryDate;
        this.status = status;
        this.currentMaxBid = currentMaxBid;
        this.customerBidList = customerBidList;
        this.farmer = farmer;
    }

    public int getBidId() {
        return bidId;
    }

    public void setBidId(int bidId) {
        this.bidId = bidId;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(int basePrice) {
        this.basePrice = basePrice;
    }

    public Customer getFinalCustomer() {
        return finalCustomer;
    }

    public void setFinalCustomer(Customer finalCustomer) {
        this.finalCustomer = finalCustomer;
    }

    public String getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getCurrentMaxBid() {
        return currentMaxBid;
    }

    public void setCurrentMaxBid(int currentMaxBid) {
        this.currentMaxBid = currentMaxBid;
    }

    public List<CustomerBid> getCustomerBidList() {
        return customerBidList;
    }

    public void setCustomerBidList(List<CustomerBid> customerBidList) {
        this.customerBidList = customerBidList;
    }

    public Farmer getFarmer() {
        return farmer;
    }

    public void setFarmer(Farmer farmer) {
        this.farmer = farmer;
    }

    @Override
    public String toString() {
        return "Bid{" +
                "bidId=" + bidId +
                ", category=" + category +
                ", quantity=" + quantity +
                ", basePrice=" + basePrice +
                ", finalCustomer=" + finalCustomer +
                ", expiryDate='" + expiryDate + '\'' +
                ", status='" + status + '\'' +
                ", currentMaxBid=" + currentMaxBid +
                ", customerBidList=" + customerBidList +
                ", farmer=" + farmer +
                '}';
    }
}
