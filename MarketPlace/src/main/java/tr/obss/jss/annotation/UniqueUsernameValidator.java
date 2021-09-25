package tr.obss.jss.annotation;

import org.springframework.beans.factory.annotation.Autowired;
import tr.obss.jss.model.User;
import tr.obss.jss.repository.UserRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    private UserRepository userRepository;


    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        User user = userRepository.findUserByUsername(username);
        if(user != null) {
            return false;
        }
        return true;
    }
}
