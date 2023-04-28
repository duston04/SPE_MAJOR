package com.example.spe_major.repo;

import com.example.spe_major.entities.HelloWorld;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelloWorldRepo extends JpaRepository<HelloWorld, Integer> {
}
