package com.example.spe_major.services;

import com.example.spe_major.Exception.ResourceNotFoundException;
import com.example.spe_major.model.Bid;
import com.example.spe_major.model.Category;
import com.example.spe_major.model.Customer;
import com.example.spe_major.model.Farmer;
import com.example.spe_major.repository.BidRepository;
import com.example.spe_major.repository.CategoryRepository;
import com.example.spe_major.repository.CustomerRepository;
import com.example.spe_major.repository.FarmerRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Component
public class BidService {

    BidRepository  bidRepository;

    FarmerRepository farmerRepository;

    CategoryRepository categoryRepository;

    UserService userService;

    CustomerRepository customerRepository;

    public BidService(BidRepository bidRepository, FarmerRepository farmerRepository, CategoryRepository categoryRepository, UserService userService, CustomerRepository customerRepository) {
        this.bidRepository = bidRepository;
        this.farmerRepository = farmerRepository;
        this.categoryRepository = categoryRepository;
        this.userService = userService;
        this.customerRepository = customerRepository;
    }

    public Bid addBid(Bid bid, String farmerUsername){
        Category category = bid.getCategory();
        Optional<Category> category1 = categoryRepository.findByTypeAndSubcategory(category.getType(), category.getSubcategory());

        if(category1.isEmpty()){
            throw new ResourceNotFoundException("No such category found. Please enter a valid category");
        }

        Farmer farmer = farmerRepository.findByUsername(farmerUsername);
        bid.setCategory(category1.get());
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

    @Scheduled(cron = "0 34 14 * * ?")
    public void expireBids(){
        String date = LocalDate.now().toString();
        List<Bid> bidList = bidRepository.findByStatus("ACTIVE");

        DateTimeFormatter f = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate today = LocalDate.parse(date, f);

        for(int i=0; i<bidList.size(); i++){
            LocalDate before = LocalDate.parse(bidList.get(i).getExpiryDate(), f);
            if(before.isBefore(today)){
                bidList.get(i).setStatus("EXPIRED");
            }
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

    public List<Bid> activeBidsForType(String type){
        List<Bid> activeBidList = bidRepository.findByStatus("ACTIVE");
        List<Bid> bidListByType = new ArrayList<>();
        for (Bid bid : activeBidList) {
            if (Objects.equals(bid.getCategory().getType(), type)) {
                bidListByType.add(bid);
            }
        }
        return bidListByType;
    }

    public List<Bid> activeBidsForSubCategory(String subCategory){
        List<Bid> activeBidList = bidRepository.findByStatus("ACTIVE");
        List<Bid> bidListBySubCategory = new ArrayList<>();
        for (Bid bid : activeBidList) {
            if (Objects.equals(bid.getCategory().getSubcategory(), subCategory)) {
                bidListBySubCategory.add(bid);
            }
        }
        return bidListBySubCategory;
    }

    public Bid updateMaxPrice(int price, int bidId){
        Optional<Bid> bid = bidRepository.findById(bidId);
        bid.get().setCurrentMaxBid(price);
        bidRepository.save(bid.get());
        return bid.get();
    }

    public List<Bid> getBidsWonByCustomer(String customerUsername){
        Optional<Customer> customer = customerRepository.findByUsername(customerUsername);
        if(customer.isEmpty()){
            throw new ResourceNotFoundException("No customer with the given username exists");
        }
        List<Bid> bidList = bidRepository.findByFinalCustomer(customer.get());
        return bidList;
    }
}
