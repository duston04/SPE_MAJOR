package com.example.spe_major.services;

import com.example.spe_major.Exception.ResourceNotFoundException;
import com.example.spe_major.model.Customer;
import com.example.spe_major.model.Farmer;
import com.example.spe_major.model.Role;
import com.example.spe_major.repository.CustomerRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;

@Component
public class CustomerService {

    CustomerRepository customerRepository;
    UserService userService;
    PasswordEncoder passwordEncoder;

    public CustomerService(CustomerRepository customerRepository, UserService userService, PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public Customer addCustomer(Customer customer){
        userService.checkIfUserIdExists(customer.getUsername());
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setRole(Role.ROLE_CUSTOMER);
        Customer customer1 = customerRepository.save(customer);
        return customer1;
    }

    public Customer updateCustomer(Customer customer){
        Optional<Customer> updatedCustomer = customerRepository.findByUserId(customer.getUserId());
        if(!Objects.equals(updatedCustomer.get().getUsername(), customer.getUsername())){
            userService.checkIfUserIdExists(customer.getUsername());
        }
        updatedCustomer.get().setUsername(customer.getUsername());
        updatedCustomer.get().setName(customer.getName());
        if(!Objects.equals(customer.getPassword(), ""))
            updatedCustomer.get().setPassword(passwordEncoder.encode(customer.getPassword()));
        updatedCustomer.get().setAddress(customer.getAddress());
        updatedCustomer.get().setPincode(customer.getPincode());
        updatedCustomer.get().setContact(customer.getContact());

        Customer customer1 = customerRepository.save(updatedCustomer.get());
        return customer1;
    }

    public Customer getProfile(String customerUsername){
        return customerRepository.findByUsername(customerUsername).get();
    }
}
