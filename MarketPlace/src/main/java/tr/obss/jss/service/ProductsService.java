package tr.obss.jss.service;

import org.springframework.data.domain.Page;
import tr.obss.jss.model.Products;
import tr.obss.jss.shared.ProductShare;

import java.util.List;
import java.util.Set;

public interface ProductsService {

    Page<Products> getAllProducts(Integer pageNumber, Integer size);

    Page searchProductByCategory(String category,Integer pageNumber, Integer size);

    Products searchProductByName(String name);

    Products searchProductById(Long id);

    Products addNewProduct(Products products);

    Products changeProductStock(Long id, int stockChange);

    Products updateProduct(Products products);

    Set<ProductShare> searchProductLikeName(String name);

    void removeProduct(Long id);

}
