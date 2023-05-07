package com.example.spe_major.repository;

import com.example.spe_major.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FarmerRepository extends JpaRepository<Farmer, Integer> {

    public Optional<Farmer> findByUserId(int id);

    public Farmer findByUsername(String username);

}
