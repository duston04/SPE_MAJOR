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
}
