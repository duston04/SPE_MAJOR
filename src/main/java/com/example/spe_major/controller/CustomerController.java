package com.example.spe_major.controller;

import com.example.spe_major.model.Bid;
import com.example.spe_major.model.Customer;
import com.example.spe_major.model.CustomerBid;
import com.example.spe_major.model.Farmer;
import com.example.spe_major.services.BidService;
import com.example.spe_major.services.CustomerBidService;
import com.example.spe_major.services.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    CustomerService customerService;

    BidService bidService;

    CustomerBidService customerBidService;


    public CustomerController(CustomerService customerService, BidService bidService, CustomerBidService customerBidService) {
        this.customerService = customerService;
        this.bidService = bidService;
        this.customerBidService = customerBidService;
    }

    @PutMapping("/update")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer){
        Customer updatedCustomer;
        try{
            updatedCustomer = customerService.updateCustomer(customer);
        }catch (RuntimeException exception){
            throw exception;
        }

        return ResponseEntity.of(Optional.of(updatedCustomer));
    }

    @GetMapping("/activeBidsBytype/{type}")
    public ResponseEntity<List<Bid>> activeBidsByType(@PathVariable String type){
        List<Bid> bidList = new ArrayList<>();
        try{
            bidList = bidService.activeBidsForType(type);
            return ResponseEntity.of(Optional.of(bidList));
        }catch (Exception e){
            throw new RuntimeException();
        }
    }

    @GetMapping("/activeBidsBySubCategory/{subcategory}")
    public ResponseEntity<List<Bid>> activeBidsBySubcategory(@PathVariable String subcategory){
        List<Bid> bidList = new ArrayList<>();
        try{
            bidList = bidService.activeBidsForSubCategory(subcategory);
            return ResponseEntity.of(Optional.of(bidList));
        }catch (Exception e){
            throw new RuntimeException();
        }
    }

    @PostMapping("/setPrice")
    public ResponseEntity<CustomerBid> setPrice(@RequestBody CustomerBid customerBid){
        CustomerBid customerBid1;
        try{
            customerBid1 = customerBidService.setPrice(customerBid.getBid().getBidId(), customerBid.getCustomer().getUsername(), customerBid.getPrice());
            return ResponseEntity.of(Optional.of(customerBid1));
        }catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/activeBidsForACustomer/{customerUsername}")
    public ResponseEntity<List<Bid>> activeBidsForACustomer(@PathVariable String customerUsername){
        List<Bid> bidList;
        try{
            bidList = customerBidService.activeBidsForCustomer(customerUsername);
            return ResponseEntity.of(Optional.of(bidList));
        }catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/deletedBidsForCustomer/{customerUsername}")
    public ResponseEntity<List<Bid>> deletedBidsForCustomer(@PathVariable String customerUsername){
        List<Bid> bidList;
        try{
            bidList = customerBidService.deletedBidsForCustomer(customerUsername);
            return ResponseEntity.of(Optional.of(bidList));
        }catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/profile/{customerUsername}")
    public ResponseEntity<Customer> getProfile(@PathVariable String customerUsername){
        Customer customer;
        try {
            customer = customerService.getProfile(customerUsername);
            return ResponseEntity.of(Optional.of(customer));
        }
        catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/getWonBiddings/{customerUsername}")
    public ResponseEntity<List<Bid>> getWonBiddings(@PathVariable String customerUsername){
        List<Bid> bidList;
        try{
            bidList = bidService.getBidsWonByCustomer(customerUsername);
            return ResponseEntity.of(Optional.of(bidList));
        }catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/activeBidsNotBiddedOn/{customerUsername}")
    public ResponseEntity<List<Bid>> activeBidsNotBiddedOn(@PathVariable String customerUsername){
        List<Bid> bidList;
        try{
            bidList = customerBidService.activeBidsNotBiddedOn(customerUsername);
            return ResponseEntity.of(Optional.of(bidList));
        }catch (RuntimeException e){
            throw  e;
        }
    }
}
