package com.example.spe_major.repository;

import com.example.spe_major.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Integer> {

    public Farmer findByUserId(int id);

}
