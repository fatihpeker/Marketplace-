package tr.obss.jss.controller;

import io.jsonwebtoken.impl.JwtMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.rememberme.InMemoryTokenRepositoryImpl;
import org.springframework.web.bind.annotation.*;
import tr.obss.jss.shared.LoginRequest;
import tr.obss.jss.model.Role;
import tr.obss.jss.model.RoleType;
import tr.obss.jss.model.User;
import tr.obss.jss.security.JwtUtils;
import tr.obss.jss.security.MyUserDetails;
import tr.obss.jss.service.RoleService;
import tr.obss.jss.service.UserService;
import tr.obss.jss.shared.GenericResponse;
import tr.obss.jss.shared.JwtResponse;
import tr.obss.jss.shared.SingUpRequest;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/1.0/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final RoleService roleService;

    private final PasswordEncoder encoder;

    private final JwtUtils jwtUtils;


    @PostMapping("/signin")
    public JwtResponse authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority()).collect(Collectors.toList());
        return JwtResponse
                .builder()
                .token(jwt)
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .roles(roles)
                .build();
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SingUpRequest singUpRequest) {
        if (userService.existsByUsername(singUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new GenericResponse("Error: Username is already taken!"));
        }

        log.info("benim infolardan biri"+singUpRequest);
        // Create new user's account

        User user = User
                .builder()
                .username(singUpRequest.getUsername())
                .password(encoder.encode(singUpRequest.getPassword()))
                .build();

        Set<String> strRoles = singUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleService.findByName(RoleType.ROLE_USER);
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleService.findByName(RoleType.ROLE_ADMIN);
                        roles.add(adminRole);

                        break;

                    default:
                        Role userRole = roleService.findByName(RoleType.ROLE_USER);
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userService.createNewUser(user);


        return ResponseEntity.ok(new GenericResponse("User registered successfully!"));
    }



}
