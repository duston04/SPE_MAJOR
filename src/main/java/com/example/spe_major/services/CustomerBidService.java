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
}
