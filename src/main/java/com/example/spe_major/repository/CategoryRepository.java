package com.example.spe_major.repository;

import com.example.spe_major.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Optional<Category> findByTypeAndSubcategory(String type, String subcategory);
}
