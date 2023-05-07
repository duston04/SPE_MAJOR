package com.example.spe_major.repository;

import com.example.spe_major.model.Bid;
import com.example.spe_major.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Integer> {

    List<Bid> findByExpiryDateAndStatus(String date, String status);

    List<Bid> findByStatus(String status);

    List<Bid> findByFarmerAndStatus(Farmer farmer, String status);

}
