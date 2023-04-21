package com.example.spe_major.repo;

import com.example.spe_major.entities.HelloWorld;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelloWorldRepo extends JpaRepository<HelloWorld, Integer> {
}
