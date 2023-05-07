package com.example.spe_major.controller;

import com.example.spe_major.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/category")
public class CategoryController {

    CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/getTypes")
    public ResponseEntity<List<String>> getTypes(){
        try {
            List<String> typesList = categoryService.getTypes();
            return ResponseEntity.of(Optional.of(typesList));
        }catch (Exception e){
            throw new RuntimeException();
        }
    }

    @GetMapping("/getCategories")
    public ResponseEntity<List<String>> getCategories(){
        try {
            List<String> typesList = categoryService.getCategories();
            return ResponseEntity.of(Optional.of(typesList));
        }catch (Exception e){
            throw new RuntimeException();
        }
    }
}
