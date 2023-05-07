package com.example.spe_major.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Category {
    
    @Id
    @GeneratedValue
    private int categoryId;

    private String type;

    @Column(unique = true)
    private String subcategory;

    @OneToMany
    @JsonIgnore
    private List<Bid> bid;

    public Category() {
    }

    public Category(int categoryId, String type, String subcategory, List<Bid> bid) {
        this.categoryId = categoryId;
        this.type = type;
        this.subcategory = subcategory;
        this.bid = bid;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(String subcategory) {
        this.subcategory = subcategory;
    }

    public List<Bid> getBid() {
        return bid;
    }

    public void setBid(List<Bid> bid) {
        this.bid = bid;
    }

    @Override
    public String toString() {
        return "Category{" +
                "categoryId=" + categoryId +
                ", type='" + type + '\'' +
                ", subcategory='" + subcategory + '\'' +
                ", bid=" + bid +
                '}';
    }
}
