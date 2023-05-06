package com.example.spe_major.repository;

import com.example.spe_major.model.HelloWorld;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelloWorldRepo extends JpaRepository<HelloWorld, Integer> {
}
