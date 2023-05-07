package com.example.spe_major.services;

import com.example.spe_major.model.Category;
import com.example.spe_major.repository.CategoryRepository;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class CategoryService {

    CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<String> getTypes(){
        List<Category> categories = categoryRepository.findAll();
        Set<String> typeList = new HashSet<String>();
        for (Category category : categories) {
            typeList.add(category.getType());
        }
        ArrayList<String> list = new ArrayList<>(typeList);
        return list;
    }

    public List<String> getCategories(){
        List<Category> categories = categoryRepository.findAll();
        Set<String> subCategoryList = new HashSet<String>();
        for (Category category : categories) {
            subCategoryList.add(category.getSubcategory());
        }
        ArrayList<String> list = new ArrayList<>(subCategoryList);
        return list;
    }
}
