package tr.obss.jss.shared;

import lombok.AllArgsConstructor;
import lombok.Data;
import tr.obss.jss.model.Products;

@AllArgsConstructor
@Data
public class ProductShare {

    private Long id;

    private String name;

    private double price;

    private String category;

    private String description;

    public ProductShare(Products products) {
        id=products.getId();
        name=products.getName();
        price=products.getPrice();
        category=products.getCategory();
        description=products.getDescription();
    }
}
