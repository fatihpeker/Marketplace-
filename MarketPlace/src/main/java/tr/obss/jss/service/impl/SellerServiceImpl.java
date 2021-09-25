package tr.obss.jss.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tr.obss.jss.model.Seller;
import tr.obss.jss.repository.SellerRepository;
import tr.obss.jss.service.SellerService;

import javax.persistence.Access;
import java.util.Objects;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    private SellerRepository sellerRepository;

    @Override
    public Seller getSellerById(Long id) {
        Objects.requireNonNull(id,"id cannot be null");
        return sellerRepository.getById(id);
    }

    @Override
    public Seller addNewSeller(Seller seller) {
        Objects.requireNonNull(seller,"seller cannot be null");
        return sellerRepository.save(seller);
    }

    @Override
    public void updateSeller(Seller seller) {
//        Seller seller = sellerRepository.getById(id);
//        if (name!=null){
//            seller.setName(name);
//        }
//        if (surname!=null){
//            seller.setSurname(surname);
//        }
//
//        if (salary!=null ){
//            seller.setSalary(salary);
//        }
        Objects.requireNonNull(seller,"seller cannot be null");
        sellerRepository.save(seller);
    }

    @Override
    public void deleteSeller(Long id) {
        Objects.requireNonNull(id,"id cannot be null");
        Seller seller = sellerRepository.getById(id);
        sellerRepository.delete(seller);
    }

    @Override
    public Page getAllSeller(Integer pageNumber, Integer size) {
        Pageable pageable = PageRequest.of(pageNumber,size);
        Page productsPage = sellerRepository.findAll(pageable);
        return productsPage;
    }
}
