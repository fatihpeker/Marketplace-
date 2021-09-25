package tr.obss.jss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import tr.obss.jss.model.Products;

import java.util.List;
import java.util.Set;

@Repository
public interface ProductsRepository extends JpaRepository<Products,Long> {

    List<Products> findProductsByCategory(String category);


    Products findProductsByName(String name);

    Products findProductsById(Long id);

    Set<Products> findProductsByNameContaining(String name);


//    @Query(value = "UPDATE Products p SET p.stock = p.stock + :stock  WHERE p.id = :id ")
//    void updateStock(int stock, Long id);


}
