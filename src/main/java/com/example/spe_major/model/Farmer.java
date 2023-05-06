package com.example.spe_major.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@PrimaryKeyJoinColumn(name = "userId")
public class Farmer extends User{

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int pincode;

    @Column(nullable = false)
    private String contact;

    @OneToMany
    @JsonIgnore
    private List<Bid> bid;

    public Farmer() {
    }

    public Farmer(String address, String name, int pincode, String contact, List<Bid> bid) {
        this.address = address;
        this.name = name;
        this.pincode = pincode;
        this.contact = contact;
        this.bid = bid;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPincode() {
        return pincode;
    }

    public void setPincode(int pincode) {
        this.pincode = pincode;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public List<Bid> getBid() {
        return bid;
    }

    public void setBid(List<Bid> bid) {
        this.bid = bid;
    }

    @Override
    public String toString() {
        return "Farmer{" +
                "address='" + address + '\'' +
                ", name='" + name + '\'' +
                ", pincode=" + pincode +
                ", contact='" + contact + '\'' +
                ", bid=" + bid +
                "} " + super.toString();
    }
}
