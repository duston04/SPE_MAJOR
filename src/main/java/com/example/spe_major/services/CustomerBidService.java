package com.example.spe_major.services;

import com.example.spe_major.Exception.ForbiddenException;
import com.example.spe_major.Exception.ResourceNotFoundException;
import com.example.spe_major.model.Bid;
import com.example.spe_major.model.Customer;
import com.example.spe_major.model.CustomerBid;
import com.example.spe_major.repository.BidRepository;
import com.example.spe_major.repository.CustomerBidRepository;
import com.example.spe_major.repository.CustomerRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Component
public class CustomerBidService {

    CustomerRepository customerRepository;
    BidRepository bidRepository;
    CustomerBidRepository customerBidRepository;

    BidService bidService;

    public CustomerBidService(CustomerRepository customerRepository, BidRepository bidRepository, CustomerBidRepository customerBidRepository, BidService bidService) {
        this.customerRepository = customerRepository;
        this.bidRepository = bidRepository;
        this.customerBidRepository = customerBidRepository;
        this.bidService = bidService;
    }

    public CustomerBid setPrice(int bidId, String customerUsername, int price){
        Optional<Bid> bid = bidRepository.findById(bidId);
        if(bid.isEmpty()){
            throw new ResourceNotFoundException("No Bid with the given Id exists");
        }
        Optional<Customer> customer = customerRepository.findByUsername(customerUsername);
        if(customer.isEmpty()){
            throw new ResourceNotFoundException("No customer with the given username exists");
        }

        if(Objects.equals(bid.get().getStatus(), "DELETED") || Objects.equals(bid.get().getStatus(), "EXPIRED") || Objects.equals(bid.get().getStatus(), "COMPLETED")){
            throw new ForbiddenException("This bid is either Expired/Deleted OR Completed. Please bid on another Item");
        }

        if(price < bid.get().getBasePrice()){
            throw new ForbiddenException("Price cannot be less than the base price");
        }

        if(price > bid.get().getCurrentMaxBid()){
            bidService.updateMaxPrice(price, bidId);
        }

        CustomerBid customerBid = new CustomerBid();

        customerBid.setPrice(price);
        customerBid.setCustomer(customer.get());
        customerBid.setBid(bid.get());

        customerBidRepository.save(customerBid);

        return customerBid;
    }

    public List<Bid> activeBidsForCustomer(String customerUsername){
        Optional<Customer> customer = customerRepository.findByUsername(customerUsername);
        if(customer.isEmpty()){
            throw new ResourceNotFoundException("Customer with the given username does not exist");
        }
        List<CustomerBid> customerBidList = customerBidRepository.findByCustomer(customer.get());

        List<Bid> bidList = new ArrayList<>();

        for(int i=0; i<customerBidList.size(); i++){
            if(Objects.equals(customerBidList.get(i).getBid().getStatus(), "ACTIVE")){
                Optional<Bid> bid = bidRepository.findById(customerBidList.get(i).getBid().getBidId());
                bidList.add(bid.get());
            }
        }

        return bidList;
    }

    public List<Bid> deletedBidsForCustomer(String customerUsername){
        Optional<Customer> customer = customerRepository.findByUsername(customerUsername);
        if(customer.isEmpty()){
            throw new ResourceNotFoundException("Customer with the given username does not exist");
        }
        List<CustomerBid> customerBidList = customerBidRepository.findByCustomer(customer.get());

        List<Bid> bidList = new ArrayList<>();

        for(int i=0; i<customerBidList.size(); i++){
            if(Objects.equals(customerBidList.get(i).getBid().getStatus(), "EXPIRED") || Objects.equals(customerBidList.get(i).getBid().getStatus(), "DELETED")){
                Optional<Bid> bid = bidRepository.findById(customerBidList.get(i).getBid().getBidId());
                bidList.add(bid.get());
            }
        }

        return bidList;
    }

    public List<CustomerBid> getCustomerBidByBidId(int bidId){
        Optional<Bid> bid = bidRepository.findById(bidId);

        if(bid.isEmpty()){
            throw new ResourceNotFoundException("No bid with given ID exists");
        }

        List<CustomerBid> customerBidList = new ArrayList<>();
        customerBidList = customerBidRepository.findByBid(bid.get());

        return customerBidList;
    }

    public Bid completeBid(int id){
        Optional<CustomerBid> customerBid = customerBidRepository.findById(id);
        if(customerBid.isEmpty()){
            throw new ResourceNotFoundException("No such bidding exists");
        }
        Optional<Customer> customer = customerRepository.findById(customerBid.get().getCustomer().getUserId());
        Optional<Bid> bid = bidRepository.findById(customerBid.get().getBid().getBidId());

        if(Objects.equals(bid.get().getStatus(), "COMPLETED")){
            throw new ForbiddenException("This Bid is already completed you cannot bid on this again");
        }

        if(Objects.equals(bid.get().getStatus(), "EXPIRED") || Objects.equals(bid.get().getStatus(), "DELETED")){
            throw new ForbiddenException("This Bid is exprired/deleted by the farmer. You cannot bid on this.");
        }

        bid.get().setCurrentMaxBid(customerBid.get().getPrice());
        bid.get().setStatus("COMPLETED");
        bid.get().setFinalCustomer(customer.get());
        Bid savedBid = bidRepository.save(bid.get());

        return savedBid;
    }
}
