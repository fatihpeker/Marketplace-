package tr.obss.jss.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tr.obss.jss.exception_error.RoleNotFoundException;
import tr.obss.jss.model.Role;
import tr.obss.jss.model.RoleType;
import tr.obss.jss.repository.RoleRepository;
import tr.obss.jss.service.RoleService;

import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    @Override
    public Role findByName(RoleType name) {
        Objects.requireNonNull(name, "role name cannot be null");
        return roleRepository.findByName(name).orElseThrow(RoleNotFoundException::new);
    }
}
