package tr.obss.jss.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tr.obss.jss.model.Products;
import tr.obss.jss.model.Seller;
import tr.obss.jss.model.User;
import tr.obss.jss.repository.UserRepository;
import tr.obss.jss.service.ProductsService;
import tr.obss.jss.service.SellerService;
import tr.obss.jss.service.UserService;
import tr.obss.jss.shared.ProductShare;
import tr.obss.jss.shared.SellerShared;


import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private ProductsService productsService;

    private SellerService sellerService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ProductsService productsService, SellerService sellerService) {
        this.userRepository = userRepository;
        this.productsService = productsService;
        this.sellerService = sellerService;
    }

    @Override
    public User  createNewUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserByUsername(String username) {
        Objects.requireNonNull(username, "username cannot be null");
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User getUserById(Long id) {
        Objects.requireNonNull(id,"id cannot be null");
        return userRepository.getById(id);
    }

    @Override
    public Page getAllUser(Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber,pageSize);
        return userRepository.findAll(pageable);
    }

    @Override
    public User updateUsersProperty(Long id, String username, String name, String surname ) {
        Objects.requireNonNull(id,"id cannot be null");
        User user = userRepository.getById(id);
        if (name!=null){
            user.setName(name);
        }
        if (username!=null){
            user.setUsername(username);
        }
        if (surname!=null){
            user.setSurname(surname);
        }
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        Objects.requireNonNull(id, "id cannot be null");
        User user = userRepository.getById(id);
        userRepository.delete(user);
    }

    @Override
    public Boolean existsByUsername(String username) {
        Objects.requireNonNull(username, "username cannot be null");
        return userRepository.existsByUsername(username);
    }

    @Override
    public boolean isInFavorite(String username, Long id) {
        Objects.requireNonNull(username, "username cannot be null");
        Objects.requireNonNull(id, "id cannot be null");
        User user = userRepository.findUserByUsername(username);
        Products products = productsService.searchProductById(id);
        return user.getFavoriteList().contains(products);
    }

    @Override
    public Set<ProductShare> getFavoriList(String username) {
        Objects.requireNonNull(username, "username cannot be null");
        User user = userRepository.findUserByUsername(username);
        Set<ProductShare> productShareHashSet = new HashSet<>();
        for (Products products : user.getFavoriteList()){
            productShareHashSet.add(new ProductShare(products));
        }
        return productShareHashSet;
    }

    @Override
    public void  addProductToFavoriteList(String username, Long productId) {
        Objects.requireNonNull(username, "username cannot be null");
        Objects.requireNonNull(productId, "productName cannot be null");
        User user = userRepository.findUserByUsername(username);
        Products products= productsService.searchProductById(productId);
        Set<Products> productsSet = user.getFavoriteList();
        productsSet.add(products);
        user.setFavoriteList(productsSet);
        userRepository.save(user);
    }

    @Override
    public void removeProductToFavoriteList(String username, Long productId) {
        Objects.requireNonNull(username, "username cannot be null");
        Objects.requireNonNull(productId, "productName cannot be null");
        User user = userRepository.findUserByUsername(username);
        Products products= productsService.searchProductById(productId);
        Set<Products> productsSet = user.getFavoriteList();
        productsSet.remove(products);
        user.setFavoriteList(productsSet);
        userRepository.save(user);
    }

    @Override
    public Set<ProductShare> getBasket(String username) {
        Objects.requireNonNull(username, "username cannot be null");
        User user = userRepository.findUserByUsername(username);
        Set<ProductShare> productShareHashSet = new HashSet<>();
        for (Products products : user.getBasket()){
            productShareHashSet.add(new ProductShare(products));
        }
        return productShareHashSet;
    }

    @Override
    public void addProductToBasket(String username, String productName) {
        Objects.requireNonNull(username, "username cannot be null");
        Objects.requireNonNull(productName, "productName cannot be null");
        User user = userRepository.findUserByUsername(username);
        Products products= productsService.searchProductByName(productName);
        Set<Products> productsSet = user.getBasket();
        productsSet.add(products);
        user.setBasket(productsSet);
        userRepository.save(user);
    }

    @Override
    public void removeProductToBasket(String username, String productName) {
        Objects.requireNonNull(username, "username cannot be null");
        Objects.requireNonNull(productName, "productName cannot be null");
        User user = userRepository.findUserByUsername(username);
        Products products= productsService.searchProductByName(productName);
        Set<Products> productsSet = user.getBasket();
        productsSet.remove(products);
        user.setBasket(productsSet);
        userRepository.save(user);
    }

    @Override
    public Set<SellerShared> getBlackList(String username) {
        Objects.requireNonNull(username, "username cannot be null");
        User user = userRepository.findUserByUsername(username);
        Set<SellerShared> sellerSharedSet = new HashSet<>();
        for (Seller seller : user.getBlackList()){
            sellerSharedSet.add(new SellerShared(seller));
        }
        return sellerSharedSet;
    }

    @Override
    public void addSellerToBlackList(String username, Long sellerId) {
        Objects.requireNonNull(username, "username cannot be null");
        Objects.requireNonNull(sellerId, "sellerId cannot be null");
        User user = userRepository.findUserByUsername(username);
        Seller seller = sellerService.getSellerById(sellerId);
        Set<Seller> sellerSet = user.getBlackList();
        sellerSet.add(seller);
        user.setBlackList(sellerSet);
        userRepository.save(user);
    }

    @Override
    public void removeSellerToBlackList(String username, Long sellerId) {
        Objects.requireNonNull(username, "username cannot be null");
        Objects.requireNonNull(sellerId, "sellerId cannot be null");
        User user = userRepository.findUserByUsername(username);
        Seller seller = sellerService.getSellerById(sellerId);
        Set<Seller> sellerSet = user.getBlackList();
        sellerSet.remove(seller);
        user.setBlackList(sellerSet);
        userRepository.save(user);
    }
}
