package com.example.spe_major.repository;

import com.example.spe_major.model.Customer;
import com.example.spe_major.model.CustomerBid;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerBidRepository extends JpaRepository<CustomerBid, Integer> {
    List<CustomerBid> findByCustomer(Customer customer);
}
