package tr.obss.jss.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@Table(name = "Products")
public class Products extends BaseEntity{


    @NotNull
    private String name;

    @NotNull
    private double price;

    private String category;

    private int stock;

    private String description;


}
