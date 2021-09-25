//package tr.obss.jss.service.impl;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//import tr.obss.jss.shared.Identity;
//import tr.obss.jss.exception_error.AuthException;
//import tr.obss.jss.model.Admin;
//import tr.obss.jss.repository.AdminRepository;
//import tr.obss.jss.repository.TokenRepository;
//import tr.obss.jss.service.AdminAuthService;
//import tr.obss.jss.shared.AdminShare;
//import tr.obss.jss.shared.AuthResponse;
//
//
//@Service
//public class AdminAuthServiceImpl implements AdminAuthService {
//
//    private AdminRepository adminRepository;
//
//    private PasswordEncoder passwordEncoder;
//
//    @Autowired
//    public AdminAuthServiceImpl(AdminRepository adminRepository, TokenRepository tokenRepository) {
//        this.adminRepository = adminRepository;
//    }
//
//    @Override
//    public AuthResponse authorisation(Identity identity) {
//        Admin admin = adminRepository.findAdminByUsername(identity.getUsername());
//        if(admin == null) {
//            throw new AuthException();
//        }
//        boolean matches = passwordEncoder.matches(identity.getPassword(), admin.getPassword());
//        if (!matches){
//            throw new AuthException();
//        }
//        AdminShare adminShare =new AdminShare(admin);
//
//        AuthResponse authResponse = new AuthResponse();
//        authResponse.setAdminShare(adminShare);
//        return authResponse;
//
//    }
//}
