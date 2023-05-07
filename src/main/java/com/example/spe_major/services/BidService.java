package com.example.spe_major.services;

import com.example.spe_major.Exception.ResourceNotFoundException;
import com.example.spe_major.model.Bid;
import com.example.spe_major.model.Category;
import com.example.spe_major.model.Farmer;
import com.example.spe_major.repository.BidRepository;
import com.example.spe_major.repository.CategoryRepository;
import com.example.spe_major.repository.FarmerRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;

@Component
public class BidService {

    BidRepository  bidRepository;

    FarmerRepository farmerRepository;

    CategoryRepository categoryRepository;

    UserService userService;

    public BidService(BidRepository bidRepository, FarmerRepository farmerRepository, CategoryRepository categoryRepository, UserService userService) {
        this.bidRepository = bidRepository;
        this.farmerRepository = farmerRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }

    public Bid addBid(Bid bid, String farmerUsername){
        Category category = bid.getCategory();
        Category category1 = categoryRepository.findByTypeAndSubcategory(category.getType(), category.getSubcategory());
        Farmer farmer = farmerRepository.findByUsername(farmerUsername);
        bid.setCategory(category1);
        bid.setFarmer(farmer);
        bid.setStatus("ACTIVE");
        Bid bid1 = bidRepository.save(bid);
        return bid;
    }

    public boolean deleteBid(int bidId){
        Optional<Bid> bid = bidRepository.findById(bidId);
        if(!bid.isPresent()){
            throw new ResourceNotFoundException("Bid does not exist");
        }
        bid.get().setStatus("DELETED");
        bidRepository.save(bid.get());
        return true;
    }

    @Scheduled(cron = "0 41 20 * * ?")
    public void sendOtpForTodaysFollowUps(){
        String date = LocalDate.now().toString();
        List<Bid> bidList = bidRepository.findByExpiryDateAndStatus(date, "ACTIVE");

        for(int i=0; i<bidList.size(); i++){
            bidList.get(i).setStatus("EXPIRED");
        }

        bidRepository.saveAll(bidList);
    }

    public List<Bid> activeBidsForFarmer(String farmerUsername){
        Farmer farmer = farmerRepository.findByUsername(farmerUsername);

        List<Bid> bidList = new ArrayList<>();
        bidList = bidRepository.findByFarmerAndStatus(farmer, "ACTIVE");

        return bidList;
    }

    public List<Bid> expiredAndDeletedBidsForFarmer(String farmerUsername){
        Farmer farmer = farmerRepository.findByUsername(farmerUsername);

        List<Bid> bidList1 = new ArrayList<>();
        List<Bid> bidList2 = new ArrayList<>();
        bidList1 = bidRepository.findByFarmerAndStatus(farmer, "EXPIRED");
        bidList2 = bidRepository.findByFarmerAndStatus(farmer, "DELETED");

        List<Bid> bidList = new ArrayList<>();
        bidList.addAll(bidList1);
        bidList.addAll(bidList2);

        return bidList;
    }

    public List<Bid> completedBidsForFarmer(String farmerUsername){
        Farmer farmer = farmerRepository.findByUsername(farmerUsername);

        List<Bid> bidList = new ArrayList<>();
        bidList = bidRepository.findByFarmerAndStatus(farmer, "COMPLETED");

        return bidList;
    }



}
