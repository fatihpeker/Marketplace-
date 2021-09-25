package tr.obss.jss.shared;

import lombok.Data;

@Data
public class AuthResponse {

    private String token;

    private UserShare userShare;

    //private AdminShare adminShare;

}
