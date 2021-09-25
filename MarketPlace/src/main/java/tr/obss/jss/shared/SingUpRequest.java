package tr.obss.jss.shared;

import lombok.Data;
import tr.obss.jss.annotation.UniqueUsername;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Set;
@Data
public class SingUpRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    @UniqueUsername
    private String username;


    private Set<String> role;

    @NotBlank
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$")
    private String password;
}
