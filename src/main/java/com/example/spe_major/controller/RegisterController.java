package com.example.spe_major.controller;

import com.example.spe_major.model.Customer;
import com.example.spe_major.model.Farmer;
import com.example.spe_major.services.CustomerService;
import com.example.spe_major.services.FarmerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/register")
public class RegisterController {

    FarmerService farmerService;

    CustomerService customerService;

    Logger logger = LoggerFactory.getLogger(RegisterController.class);

    public RegisterController(FarmerService farmerService, CustomerService customerService) {
        this.farmerService = farmerService;
        this.customerService = customerService;
    }

    @PostMapping("/farmer")
    public ResponseEntity<Farmer> registerFarmer(@RequestBody Farmer farmer){
        logger.info("Farmer register API Hit");
        Farmer savedFarmer;
        try{
            savedFarmer = farmerService.addFarmer(farmer);
        }
        catch (RuntimeException exception){
            throw exception;
        }
        return ResponseEntity.of(Optional.of(savedFarmer));
    }

    @PostMapping("/customer")
    public ResponseEntity<Customer> registerCustomer(@RequestBody Customer customer){
        logger.info("Customer register API Hit");
        Customer savedCustomer;
        try{
            savedCustomer = customerService.addCustomer(customer);
        }
        catch (RuntimeException exception){
            throw exception;
        }
        return ResponseEntity.of(Optional.of(savedCustomer));
    }

}
