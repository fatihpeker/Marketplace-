package tr.obss.jss.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tr.obss.jss.model.User;
import tr.obss.jss.security.MyUserDetails;
import tr.obss.jss.service.UserService;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImple implements UserDetailsService {

    private final UserService userService;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User user = userService.getUserByUsername(username);

        return MyUserDetails.build(user);
    }
}
