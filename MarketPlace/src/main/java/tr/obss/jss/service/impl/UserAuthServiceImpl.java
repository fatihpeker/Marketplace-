//package tr.obss.jss.service.impl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import tr.obss.jss.shared.Identity;
//import tr.obss.jss.auth.Token;
//import tr.obss.jss.exception_error.AuthException;
//import tr.obss.jss.model.User;
//import tr.obss.jss.repository.TokenRepository;
//import tr.obss.jss.repository.UserRepository;
//import tr.obss.jss.service.UserAuthService;
//import tr.obss.jss.shared.AuthResponse;
//import tr.obss.jss.shared.UserShare;
//
//import javax.transaction.Transactional;
//import java.util.Optional;
//import java.util.UUID;
//
//@Service
//public class UserAuthServiceImpl implements UserAuthService {
//
//
//    private UserRepository userRepository;
//
//    private TokenRepository tokenRepository;
//
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public UserAuthServiceImpl(UserRepository userRepository, TokenRepository tokenRepository) {
//        this.userRepository = userRepository;
//        this.tokenRepository = tokenRepository;
//    }
//
//    @Override
//    public AuthResponse authorisation(Identity identity) {
//        User user = userRepository.findUserByUsername(identity.getUsername());
//        if(user == null) {
//            throw new AuthException();
//        }
//        boolean matches = passwordEncoder.matches(identity.getPassword(), user.getPassword());
//        if (!matches){
//            throw new AuthException();
//        }
//        UserShare userShare =new UserShare(user);
//        String token = generateRandomToken();
//
//        Token entityToken = new Token();
//        entityToken.setToken(token);
//        entityToken.setUser(user);
//        tokenRepository.save(entityToken);
//
//        AuthResponse authResponse = new AuthResponse();
//        authResponse.setUserShare(userShare);
//        authResponse.setToken(token);
//        return authResponse;
//
//    }
//
//    @Override
//    @Transactional
//    public UserDetails getUserDetails(String token) {
//        Optional<Token>optionalToken =tokenRepository.findById(token);
//        if (!optionalToken.isPresent()){
//            return null;
//        }
//        return (UserDetails) optionalToken.get().getUser();
//    }
//
//    @Override
//    public String generateRandomToken() {
//        return UUID.randomUUID().toString().replaceAll("-","");
//    }
//
//
//    @Override
//    public void clearToken(String token) {
//        tokenRepository.deleteById(token);
//    }
//}
