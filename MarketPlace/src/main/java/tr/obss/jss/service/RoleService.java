package tr.obss.jss.service;

import tr.obss.jss.model.Role;
import tr.obss.jss.model.RoleType;

public interface RoleService {

    Role findByName(RoleType name);
}
