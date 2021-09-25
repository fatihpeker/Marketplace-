package tr.obss.jss.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@SuperBuilder
@NoArgsConstructor
@Entity
@Data
public class Seller extends BaseEntity{


    @NotNull
    protected String name;

    @NotNull
    protected String surname;

    @NotNull
    private Double salary;


}
