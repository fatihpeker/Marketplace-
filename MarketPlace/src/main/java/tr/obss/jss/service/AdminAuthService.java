package tr.obss.jss.service;

import tr.obss.jss.shared.LoginRequest;
import tr.obss.jss.shared.AuthResponse;

public interface AdminAuthService {

    public AuthResponse authorisation(LoginRequest loginRequest);

}
