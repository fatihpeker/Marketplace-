package tr.obss.jss.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import tr.obss.jss.model.Products;
import tr.obss.jss.repository.ProductsRepository;
import tr.obss.jss.service.ProductsService;
import tr.obss.jss.shared.ProductShare;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Slf4j
@Service
public class ProductsServiceImpl implements ProductsService {

    private ProductsRepository productsRepository;

    @Autowired
    public ProductsServiceImpl(ProductsRepository productsRepository) {
        this.productsRepository = productsRepository;
    }

    @Override
    public Page getAllProducts(Integer pageNumber, Integer size) {
        Pageable pageable = PageRequest.of(pageNumber,size);
        Page productsPage = productsRepository.findAll(pageable);
        return productsPage;
    }

    @Override
    public Page searchProductByCategory(String category,Integer pageNumber, Integer size) {
        //Pageable pageable = PageRequest.of(pageNumber,size);
        Page productsPage = (Page) productsRepository.findProductsByCategory(category);
        return productsPage;
    }


    @Override
    public Products searchProductByName(String name) {
        Objects.requireNonNull(name,"name cannot be null");
        return productsRepository.findProductsByName(name);
    }

    @Override
    public Products searchProductById(Long id) {
        Objects.requireNonNull(id,"name cannot be null");
        return productsRepository.findProductsById(id);
    }

    @Override
    public Products addNewProduct(Products products) {
        //log.info("services {}",productsRepository.save(products));
        Objects.requireNonNull(products,"product cannot be null");
        return productsRepository.save(products);
    }

    @Override
    public Products changeProductStock(Long id, int stockChange) {
        Objects.requireNonNull(id,"id cannot be null");
        Products products = productsRepository.findProductsById(id);
        products.setStock(products.getStock()+stockChange);
        return productsRepository.save(products);
    }

    @Override
    public Products updateProduct(Products products) {
//        Products products1 = productsRepository.findProductsByName(products.getName());
//        products1.setPrice(products.getPrice());
//        products1.setDescription(products.getDescription());
//        products1.setStock(products.getStock());
//        products1.setCategory(products.getCategory());
        return productsRepository.save(products);
    }

    @Override
    public Set<ProductShare> searchProductLikeName(String name) {
        Objects.requireNonNull(name,"name cannot be null");
        Set<ProductShare> productShareSet = new HashSet<>();
        log.info(" geliyo mu : " + productsRepository.findProductsByNameContaining(name));
        for (Products product : productsRepository.findProductsByNameContaining(name)) {
            productShareSet.add(new ProductShare(product));
        }
        return productShareSet;
    }

    @Override
    public void removeProduct(Long id) {
        Objects.requireNonNull(id,"id cannot be null");
        productsRepository.deleteById(id);
    }
}
