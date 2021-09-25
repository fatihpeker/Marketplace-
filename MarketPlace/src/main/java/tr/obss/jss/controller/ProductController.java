//package tr.obss.jss.controller;
//
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.web.bind.annotation.*;
//import tr.obss.jss.model.Products;
//import tr.obss.jss.service.ProductsService;
//import tr.obss.jss.shared.GenericResponse;
//import tr.obss.jss.shared.ProductShare;
//
//import javax.validation.Valid;
//import java.util.List;
//
//@Slf4j
//@RestController
//@RequestMapping("/api/1.0/product")
//public class ProductController {
//
//    private ProductsService productsService;
//
//    @Autowired
//    public ProductController(ProductsService productsService) {
//        this.productsService = productsService;
//    }
//
//
//
//
//
//    /* ********* Bunlar adminin işi*********** */
////    //yeni ürün ekleme
////    @PostMapping
////    public Products addNewProduct(@RequestBody @Valid Products products){
////        log.info("controller {}", productsService.addNewProduct(products));
////        return productsService.addNewProduct(products);
////    }
//
////    //ürünün özelliklerinin güncellenmesi
////    @PostMapping("/update")
////    public Products updateProduct(@RequestBody @Valid ProductShare productShare){
////        log.info("update product info {}"+productShare);
////        return productsService.updateProduct(productShare);
////    }
//
////    //ürünü tamamen silme
////    @DeleteMapping
////    public GenericResponse removeProduct(@RequestParam(value = "id") Long id){
////        log.info("id : "+id);
////        productsService.removeProduct(id);
////        return new GenericResponse("Product Removed");
////    }
//
//    /* hem user hem adminler bunu yapabilirler  */
//
////    //kategoriye göre ürünleri listeleme
////    @GetMapping("/category")
////    public List<Products> getProductsByCategory(@RequestParam(value = "category")String category){
////        return productsService.searchProductByCategory(category);
////    }
////
////    //ismine göre ürünü getirme
////    @GetMapping("/name")
////    public Products getProductByName(@RequestParam(value = "name")String name){
////        return productsService.searchProductByName(name);
////    }
////
////    //Tüm ürünleri listeleme
////    @GetMapping
////    public List<Products> getAllProducts(){
////        return productsService.getAllProducts();
////    }
//
////    //ürün stoklarını değiştirme
////    @PostMapping("/change")
////    public Products changeProductStock(@RequestParam(value = "id")  Long id,@RequestParam(value = "stockChange") int stockChange){
////        log.info("change girdi" + id + stockChange);
////        return productsService.changeProductStock(id,stockChange);
////    }
//
//}
