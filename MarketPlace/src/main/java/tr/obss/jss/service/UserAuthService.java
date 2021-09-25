package tr.obss.jss.service;

import org.springframework.security.core.userdetails.UserDetails;
import tr.obss.jss.shared.LoginRequest;
import tr.obss.jss.shared.AuthResponse;

public interface UserAuthService {

    public AuthResponse authorisation(LoginRequest loginRequest);

    public UserDetails getUserDetails(String token);

    public String generateRandomToken();

    public void clearToken(String token);

}
