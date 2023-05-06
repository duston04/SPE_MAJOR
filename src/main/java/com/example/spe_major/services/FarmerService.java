package com.example.spe_major.services;

import com.example.spe_major.model.Farmer;
import com.example.spe_major.model.Role;
import com.example.spe_major.repository.FarmerRepository;
import org.hibernate.type.descriptor.jdbc.JdbcTypeFamilyInformation;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class FarmerService {

    FarmerRepository farmerRepository;

    UserService userService;

    public FarmerService(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    public Farmer addFarmer(Farmer farmer){
        farmer.setRole(Role.ROLE_FARMER);
        userService.checkIfUserIdExists(farmer.getUsername());
        Farmer farmer1 = farmerRepository.save(farmer);
        return farmer1;
    }

    public Farmer updateFarmer(Farmer farmer){
        Farmer updatedFarmer = farmerRepository.findByUserId(farmer.getUserId());
        if(!Objects.equals(updatedFarmer.getUsername(), farmer.getUsername())){
            userService.checkIfUserIdExists(farmer.getUsername());
        }
        updatedFarmer.setUsername(farmer.getUsername());
        updatedFarmer.setName(farmer.getName());
        updatedFarmer.setPassword(farmer.getPassword());
        updatedFarmer.setAddress(farmer.getAddress());
        updatedFarmer.setPincode(farmer.getPincode());
        updatedFarmer.setContact(farmer.getContact());

        Farmer farmer1 = farmerRepository.save(updatedFarmer);
        return farmer1;
    }

}
