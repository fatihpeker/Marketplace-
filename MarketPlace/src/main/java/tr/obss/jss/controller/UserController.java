package tr.obss.jss.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import tr.obss.jss.model.Products;
import tr.obss.jss.model.User;
import tr.obss.jss.service.ProductsService;
import tr.obss.jss.service.SellerService;
import tr.obss.jss.service.UserService;
import tr.obss.jss.shared.GenericResponse;
import tr.obss.jss.shared.ProductShare;
import tr.obss.jss.shared.SellerShared;
import tr.obss.jss.shared.UserShare;


import java.util.Set;

@Slf4j
@RestController
@RequestMapping("api/1.0/user")
public class UserController {

    private UserService userService;

    private ProductsService productsService;

    private SellerService sellerService;

    @Autowired
    public UserController(UserService userService, ProductsService productsService, SellerService sellerService) {
        this.userService = userService;
        this.productsService = productsService;
        this.sellerService = sellerService;
    }

    //Username e göre user getir
    @GetMapping("/name")
    public UserShare getUserByUsername(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
       User user = userService.getUserByUsername(username);
       return new UserShare(user);
    }

    //User ın özelliklerini güncelle
    @PostMapping("/update")
    public UserShare updateUsersProperty(@RequestParam(value = "id")  Long id, @RequestParam(value = "username") String username,@RequestParam(value = "name") String name, @RequestParam(value = "surname") String surname){
        User user = userService.updateUsersProperty(id, username, name, surname);
        return new UserShare(user);
    }

    //kullanıcının silinmesi
    @DeleteMapping
    public GenericResponse deleteUser(@RequestParam(value = "id") Long id){
        userService.deleteUser(id);
        return new GenericResponse("User Removed");
    }

    @GetMapping("/favoriteList")
    public Set<ProductShare> getFavoriList(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getFavoriList(username);
    }

    @GetMapping("/isInFavorite")
    public boolean isInFavorite(@RequestParam(value = "productId") Long productId){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("is in : " + userService.isInFavorite(username,productId));
        return userService.isInFavorite(username,productId);
    }

    @PostMapping("/addProduct")
    public GenericResponse addProductFavoriteList(@RequestParam(value = "productId") Long productId){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.addProductToFavoriteList(username,productId);
        return new GenericResponse("The product has been added to your favorite list");
    }

    @PostMapping("/removeProduct")
    public GenericResponse removeProductFavoriteList(@RequestParam(value = "productId") Long productId){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.removeProductToFavoriteList(username,productId);
        return new GenericResponse("The product has been removed to your favorite list");
    }

    @GetMapping("/basket")
    public Set<ProductShare> getBasket(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.getBasket(username);
    }

    @PostMapping("/addBasket")
    public GenericResponse addProductBasket(@RequestParam(value = "productName") String productName){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.addProductToBasket(username,productName);
        return new GenericResponse("The product has been added to your shopping basket");
    }

    @PostMapping("/removeBasket")
    public GenericResponse removeProductBasket(@RequestParam(value = "productName") String productName){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.removeProductToBasket(username,productName);
        return new GenericResponse("The product has been removed to your shopping basket");
    }

    //Tüm satcıları listeleme
    @GetMapping("getAllSeller")
    public Page getAllSeller(@RequestParam(value = "pageNumber",defaultValue = "0")  Integer pageNumber, @RequestParam(value = "pageSize", defaultValue = "2") Integer pageSize){
        return sellerService.getAllSeller(pageNumber,pageSize);
    }

    @GetMapping("/blackList")
    public Set<SellerShared> getBlackList(){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return  userService.getBlackList(username);
    }

    @PostMapping("/addSeller")
    public GenericResponse addBlackList(@RequestParam(value = "sellerId") Long sellerId){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.addSellerToBlackList(username,sellerId);
        return new GenericResponse("The seller has been added to your BlackList");
    }

    @PostMapping("/removeSeller")
    public GenericResponse removeBlackList(@RequestParam(value = "sellerId") Long sellerId){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.removeSellerToBlackList(username,sellerId);
        return new GenericResponse("The seller has been removed to your BlackList");
    }

    //kategoriye göre ürünleri listeleme
    @GetMapping("/category")
    public Page getAllProducts(@RequestParam(value = "category") String category,  @RequestParam(value = "pageNumber",defaultValue = "0")  Integer pageNumber,@RequestParam(value = "pageSize", defaultValue = "2") Integer pageSize){
        return productsService.searchProductByCategory(category,pageNumber,pageSize);
    }

    //id göre ürünü getirme
    @GetMapping("/byId")
    public Products getProductById(@RequestParam(value = "id")Long id){
        return productsService.searchProductById(id);
    }

    //Tüm ürünleri listeleme
    @GetMapping("getAllProduct")
    public Page getAllProducts(@RequestParam(value = "pageNumber",defaultValue = "0")  Integer pageNumber,@RequestParam(value = "pageSize", defaultValue = "2") Integer pageSize){
        return productsService.getAllProducts(pageNumber,pageSize);
    }

    //benzer isimleri search etme
    @GetMapping("searchLikeName")
    public  Set<ProductShare> searcLikeName(@RequestParam(value = "name")String name){
        return productsService.searchProductLikeName(name);
    }


    //ürün stoklarını değiştirme
    @PostMapping("/change")
    public Products changeProductStock(@RequestParam(value = "id")  Long id,@RequestParam(value = "stockChange") int stockChange){
        log.info("change girdi" + id + stockChange);
        return productsService.changeProductStock(id,stockChange);
    }
}
