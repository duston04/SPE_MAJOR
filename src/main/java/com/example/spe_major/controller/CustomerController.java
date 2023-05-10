package com.example.spe_major.controller;

import com.example.spe_major.model.Bid;
import com.example.spe_major.model.Customer;
import com.example.spe_major.model.CustomerBid;
import com.example.spe_major.model.Farmer;
import com.example.spe_major.services.BidService;
import com.example.spe_major.services.CustomerBidService;
import com.example.spe_major.services.CustomerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    Logger logger = LoggerFactory.getLogger(CustomerController.class);

    public CustomerController(CustomerService customerService, BidService bidService, CustomerBidService customerBidService) {
        this.customerService = customerService;
        this.bidService = bidService;
        this.customerBidService = customerBidService;
    }

    @PutMapping("/update")
    public ResponseEntity<Customer> updateCustomer(@RequestBody Customer customer){
        logger.info("Customer profile update API hit");
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
        logger.info("Customer get active bids for the given type API hit");
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
        logger.info("Customer get active bids for the given subcategory API hit");
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
        logger.info("Customer set price for a Bid API hit");
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
        logger.info("Get all active bids for a customer API Hit");
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
        logger.info("Get all deleted/expired bids for a customer API Hit");
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
        logger.info("Get Customer Profile API Hit");
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
        logger.info("Customer get list of won biddings API Hit");
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
        logger.info("Customer get list of bids that he has not bidded on API Hit");
        List<Bid> bidList;
        try{
            bidList = customerBidService.activeBidsNotBiddedOn(customerUsername);
            return ResponseEntity.of(Optional.of(bidList));
        }catch (RuntimeException e){
            throw  e;
        }
    }
}
