package tr.obss.jss.repository;

import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import tr.obss.jss.model.Seller;

@Registered
public interface SellerRepository extends JpaRepository<Seller,Long> {
}
