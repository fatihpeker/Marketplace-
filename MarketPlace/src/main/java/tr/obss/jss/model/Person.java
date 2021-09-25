package tr.obss.jss.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.MappedSuperclass;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@SuperBuilder
@NoArgsConstructor
@Data
@MappedSuperclass
public class Person extends BaseEntity{

    protected String name;


    protected String surname;

    @NotBlank
    @NotNull
    @Size(min = 3,max = 255)
    private String username;

    @NotBlank
    @NotNull
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message = "habura tutmay")
    private String password;

    //Kullanıcıların yetkilerini tutan rolller
    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Role> roles = new HashSet<>();

}
