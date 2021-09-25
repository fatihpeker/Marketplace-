package tr.obss.jss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tr.obss.jss.model.Role;
import tr.obss.jss.model.RoleType;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(RoleType name);
}
