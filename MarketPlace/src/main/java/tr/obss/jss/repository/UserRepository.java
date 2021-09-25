package tr.obss.jss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.obss.jss.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findUserByUsername(String username);

    Boolean existsByUsername(String username);
}
