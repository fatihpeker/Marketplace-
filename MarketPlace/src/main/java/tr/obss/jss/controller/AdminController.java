package tr.obss.jss.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import tr.obss.jss.model.Products;
import tr.obss.jss.model.Seller;
import tr.obss.jss.model.User;
import tr.obss.jss.service.ProductsService;
import tr.obss.jss.service.SellerService;
import tr.obss.jss.service.UserService;
import tr.obss.jss.shared.GenericResponse;
import tr.obss.jss.shared.ProductShare;
import tr.obss.jss.shared.UserShare;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/1.0/admin")
public class AdminController {

    private SellerService sellerService;

    private UserService userService;

    private ProductsService productsService;

    @Autowired
    public AdminController(SellerService sellerService, UserService userService, ProductsService productsService) {
        this.sellerService = sellerService;
        this.userService = userService;
        this.productsService = productsService;
    }

    @PostMapping("/addSeller")
    public Seller addSeller(@RequestBody @Valid Seller seller){
        return sellerService.addNewSeller(seller);
    }

    @PostMapping("/updateSeller")
    public GenericResponse updateSeller(@RequestBody @Valid Seller seller){
        sellerService.updateSeller(seller);
        return new GenericResponse("Seller was updated");
    }

    @DeleteMapping("/deleteSeller")
    public GenericResponse deleteSeller(@RequestParam(value = "id") Long id){
        sellerService.deleteSeller(id);
        return new GenericResponse("Seller vas removed");
    }


    //Tüm satcıları listeleme
    @GetMapping("getAllSeller")
    public Page getAllSeller(@RequestParam(value = "pageNumber",defaultValue = "0")  Integer pageNumber, @RequestParam(value = "pageSize", defaultValue = "2") Integer pageSize){
        return sellerService.getAllSeller(pageNumber,pageSize);
    }

    //Tüm satcıları listeleme
    @GetMapping("getAllUser")
    public Page getAllUser(@RequestParam(value = "pageNumber",defaultValue = "0")  Integer pageNumber, @RequestParam(value = "pageSize", defaultValue = "2") Integer pageSize){
        return userService.getAllUser(pageNumber,pageSize);
    }

    //User ın özelliklerini güncelle
    @PostMapping("/updateUser")
    public UserShare updateUsersProperty(@RequestParam(value = "id")  Long id, @RequestParam(value = "username") String username, @RequestParam(value = "name") String name, @RequestParam(value = "surname") String surname){
        User user = userService.updateUsersProperty(id, username, name, surname);
        return new UserShare(user);
    }

    //kullanıcının silinmesi
    @DeleteMapping("/deleteUser")
    public GenericResponse deleteUser(@RequestParam(value = "id") Long id){
        userService.deleteUser(id);
        return new GenericResponse("User Removed");
    }

    //yeni ürün ekleme
    @PostMapping("/addProduct")
    public Products addNewProduct(@RequestBody @Valid Products products){
        return productsService.addNewProduct(products);
    }

    //ürünün özelliklerinin güncellenmesi
    @PostMapping("/updateProduct")
    public Products updateProduct(@RequestBody @Valid Products products){
        return productsService.updateProduct(products);
    }

    //!!!!!!!! Birinin fav listesinde bulunan ürünü silemiyorsun. buna bak!!!!
    //ürünü tamamen silme
    @DeleteMapping("/deleteProduct")
    public GenericResponse removeProduct(@RequestParam(value = "id") Long id){
        productsService.removeProduct(id);
        return new GenericResponse("Product Removed");
    }

    //kategoriye göre ürünleri listeleme
    @GetMapping("/category")
    public Page getAllProducts(@RequestParam(value = "category") String category,  @RequestParam(value = "pageNumber",defaultValue = "0")  Integer pageNumber,@RequestParam(value = "pageSize", defaultValue = "2") Integer pageSize){
        return productsService.searchProductByCategory(category,pageNumber,pageSize);
    }

    //ismine göre ürünü getirme
    @GetMapping("/name")
    public Products getProductByName(@RequestParam(value = "name")String name){
        return productsService.searchProductByName(name);
    }

    //Tüm ürünleri listeleme
    @GetMapping("getAllProduct")
    public Page getAllProducts(@RequestParam(value = "pageNumber",defaultValue = "0")  Integer pageNumber, @RequestParam(value = "pageSize", defaultValue = "2") Integer pageSize){
        return productsService.getAllProducts(pageNumber,pageSize);
    }

    //ürün stoklarını değiştirme
    @PostMapping("/change")
    public Products changeProductStock(@RequestParam(value = "id")  Long id,@RequestParam(value = "stockChange") int stockChange){
        log.info("change girdi" + id + stockChange);
        return productsService.changeProductStock(id,stockChange);
    }

}
