package com.example.spe_major.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

import java.util.List;

@Entity
@PrimaryKeyJoinColumn(name = "userId")
public class Customer extends User{

    private String name;

    private String address;

    private int pincode;

    private String contact;

    @OneToMany
    @JsonIgnore
    private List<CustomerBid> customerBid;

    public Customer() {
    }

    public Customer(String name, String address, int pincode, String contact, List<CustomerBid> customerBid) {
        this.name = name;
        this.address = address;
        this.pincode = pincode;
        this.contact = contact;
        this.customerBid = customerBid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public List<CustomerBid> getCustomerBid() {
        return customerBid;
    }

    public void setCustomerBid(List<CustomerBid> customerBid) {
        this.customerBid = customerBid;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", pincode=" + pincode +
                ", contact='" + contact + '\'' +
                ", customerBid=" + customerBid +
                "} " + super.toString();
    }
}
