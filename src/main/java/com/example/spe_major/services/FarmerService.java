package com.example.spe_major.services;

import com.example.spe_major.model.Customer;
import com.example.spe_major.model.Farmer;
import com.example.spe_major.model.Role;
import com.example.spe_major.repository.FarmerRepository;
import org.hibernate.type.descriptor.jdbc.JdbcTypeFamilyInformation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class FarmerService {

    FarmerRepository farmerRepository;

    UserService userService;

    PasswordEncoder passwordEncoder;

    Logger logger = LoggerFactory.getLogger(FarmerService.class);

    public FarmerService(FarmerRepository farmerRepository, UserService userService, PasswordEncoder passwordEncoder) {
        this.farmerRepository = farmerRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public Farmer addFarmer(Farmer farmer){
        userService.checkIfUserIdExists(farmer.getUsername());
        farmer.setRole(Role.ROLE_FARMER);
        farmer.setPassword(passwordEncoder.encode(farmer.getPassword()));
        Farmer farmer1 = farmerRepository.save(farmer);
        logger.trace("Farmer Registered");
        return farmer1;
    }

    public Farmer updateFarmer(Farmer farmer){
        Optional<Farmer> updatedFarmer = farmerRepository.findByUserId(farmer.getUserId());
        if(!Objects.equals(updatedFarmer.get().getUsername(), farmer.getUsername())){
            userService.checkIfUserIdExists(farmer.getUsername());
        }
        updatedFarmer.get().setUsername(farmer.getUsername());
        updatedFarmer.get().setName(farmer.getName());
        if(!Objects.equals(farmer.getPassword(), ""))
            updatedFarmer.get().setPassword(passwordEncoder.encode(farmer.getPassword()));
        updatedFarmer.get().setAddress(farmer.getAddress());
        updatedFarmer.get().setPincode(farmer.getPincode());
        updatedFarmer.get().setContact(farmer.getContact());

        Farmer farmer1 = farmerRepository.save(updatedFarmer.get());

        logger.trace("Farmer Profile Updated");
        return farmer1;
    }

    public Farmer getProfile(String farmerUsername){
        logger.trace("Farmer Profile fetched");
        return farmerRepository.findByUsername(farmerUsername);
    }

}
