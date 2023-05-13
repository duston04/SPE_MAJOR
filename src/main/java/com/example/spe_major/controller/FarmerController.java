package com.example.spe_major.controller;

import com.example.spe_major.model.Bid;
import com.example.spe_major.model.Category;
import com.example.spe_major.model.CustomerBid;
import com.example.spe_major.model.Farmer;
import com.example.spe_major.services.BidService;
import com.example.spe_major.services.CustomerBidService;
import com.example.spe_major.services.FarmerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/farmer")
public class FarmerController {

    FarmerService farmerService;
    BidService bidService;

    CustomerBidService customerBidService;

    Logger logger = LoggerFactory.getLogger(FarmerController.class);
    public FarmerController(FarmerService farmerService, BidService bidService, CustomerBidService customerBidService) {
        this.farmerService = farmerService;
        this.bidService = bidService;
        this.customerBidService = customerBidService;
    }

    @PutMapping("/update")
    public ResponseEntity<Farmer> updateFarmer(@RequestBody Farmer farmer){
        logger.info("Farmer profile update API hit");
        Farmer updatedFarmer;

        try{
            updatedFarmer = farmerService.updateFarmer(farmer);
        }catch (RuntimeException exception){
            throw exception;
        }

        return ResponseEntity.of(Optional.of(updatedFarmer));
    }

    @PostMapping("/addBid/{farmerUsername}")
    public ResponseEntity<Bid> addBid(@RequestBody Bid bid, @PathVariable String farmerUsername){
        logger.info("Farmer add bid API hit");
        Bid savedBid;
        try{
            savedBid = bidService.addBid(bid, farmerUsername);
        }
        catch (RuntimeException exception){
            throw exception;
        }
        return ResponseEntity.of(Optional.of(savedBid));
    }

    @PostMapping("/deleteBid/{bidId}")
    public ResponseEntity<Boolean> deleteBid(@PathVariable int bidId){
        logger.info("Farmer delete bid API hit");
        try{
            bidService.deleteBid(bidId);
        }
        catch (RuntimeException exception){
            throw exception;
        }
        return ResponseEntity.of(Optional.of(true));
    }

    @GetMapping("/activeBids/{farmerUsername}")
    public ResponseEntity<List<Bid>> activeBidsForFarmer(@PathVariable String farmerUsername){
        logger.info("Farmer get active bids API hit");
        List<Bid> bidList;
        try{
            bidList = bidService.activeBidsForFarmer(farmerUsername);
            Collections.sort(bidList, new Comparator<Bid>() {
                @Override
                public int compare(Bid o1, Bid o2) {
                    return o1.getExpiryDate().compareTo(o2.getExpiryDate());
                }
            });
            return ResponseEntity.of(Optional.of(bidList));
        }
        catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/expiredAndDeletedBids/{farmerUsername}")
    public ResponseEntity<List<Bid>> expiredAndDeletedBidsForFarmer(@PathVariable String farmerUsername){
        logger.info("Farmer get deleted/expired bids API hit");
        List<Bid> bidList;
        try{
            bidList = bidService.expiredAndDeletedBidsForFarmer(farmerUsername);
            return ResponseEntity.of(Optional.of(bidList));
        }
        catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/completedBids/{farmerUsername}")
    public ResponseEntity<List<Bid>> completedBidsForFarmer(@PathVariable String farmerUsername){
        logger.info("Farmer get completed bids API hit");
        List<Bid> bidList;
        try{
            bidList = bidService.completedBidsForFarmer(farmerUsername);
            return ResponseEntity.of(Optional.of(bidList));
        }
        catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/profile/{farmerUsername}")
    public ResponseEntity<Farmer> getProfile(@PathVariable String farmerUsername){
        logger.info("Get Farmer profile  API hit");
        Farmer farmer;
        try {
            farmer = farmerService.getProfile(farmerUsername);
            return ResponseEntity.of(Optional.of(farmer));
        }
        catch (RuntimeException e){
            throw e;
        }
    }

    @GetMapping("/customersPerBid/{bidId}")
    public ResponseEntity<List<CustomerBid>> getCustomerPerBid(@PathVariable int bidId){
        logger.info("Get all customers per bid API hit");
        List<CustomerBid> customerBidList;
        try{
            customerBidList = customerBidService.getCustomerBidByBidId(bidId);
            return ResponseEntity.of(Optional.of(customerBidList));
        }catch (RuntimeException e){
            throw e;
        }
    }

    @PostMapping("/completeBid/{id}")
    public ResponseEntity<Bid> completeBid(@PathVariable int id){
        logger.info("Sell i.e Complete the bid api hit");
        Bid bid;
        try {
            bid = customerBidService.completeBid(id);
            return ResponseEntity.of(Optional.of(bid));
        }catch (RuntimeException e){
            throw e;
        }
    }
}
