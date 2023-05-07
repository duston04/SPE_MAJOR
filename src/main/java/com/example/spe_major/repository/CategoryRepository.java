package com.example.spe_major.repository;

import com.example.spe_major.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    Category findByTypeAndSubcategory(String type, String subcategory);
}
