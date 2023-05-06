package com.example.spe_major.controller;

import com.example.spe_major.model.Farmer;
import com.example.spe_major.services.FarmerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/farmer")
public class FarmerController {

    FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    @PutMapping("/update")
    public ResponseEntity<Farmer> updateFarmer(@RequestBody Farmer farmer){
        Farmer updatedFarmer;

        try{
            updatedFarmer = farmerService.updateFarmer(farmer);
        }catch (RuntimeException exception){
            throw exception;
        }

        return ResponseEntity.of(Optional.of(updatedFarmer));
    }
}
