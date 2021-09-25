package tr.obss.jss.service;

import org.springframework.data.domain.Page;
import tr.obss.jss.model.Seller;

public interface SellerService {

    Seller getSellerById(Long id);

    Seller addNewSeller(Seller seller);

    void updateSeller(Seller seller);

    void deleteSeller(Long id);

    Page getAllSeller(Integer pageNumber, Integer size);
}
