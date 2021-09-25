package tr.obss.jss.shared;

import lombok.Data;
import tr.obss.jss.model.Seller;

@Data
public class SellerShared {

    private Long id;

    private String name;

    private String surname;

    public SellerShared(Seller seller) {
        id= seller.getId();
        name = seller.getName();
        surname = seller.getSurname();
    }
}
