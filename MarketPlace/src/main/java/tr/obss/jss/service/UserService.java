package tr.obss.jss.service;

import org.springframework.data.domain.Page;
import tr.obss.jss.model.User;
import tr.obss.jss.shared.ProductShare;
import tr.obss.jss.shared.SellerShared;


import java.util.Set;

public interface UserService {

    User createNewUser(User user);

    User getUserByUsername(String username);

    User getUserById(Long id);

    Page getAllUser(Integer pageNumber, Integer pageSize);

    User updateUsersProperty(Long id, String username, String name, String surname);

    void deleteUser(Long id);

    Boolean existsByUsername(String username);

    boolean isInFavorite(String username, Long id);

    Set<ProductShare> getFavoriList(String username);

    void addProductToFavoriteList(String username, Long productName);

    void removeProductToFavoriteList(String username, Long productId);

    Set<ProductShare> getBasket(String username);

    void addProductToBasket(String username, String productName);

    void removeProductToBasket(String username, String productName);

    Set<SellerShared> getBlackList(String username);

    void addSellerToBlackList(String username, Long SellerId);

    void removeSellerToBlackList(String username, Long SellerId);



}
