package tr.obss.jss.shared;

import lombok.AllArgsConstructor;
import lombok.Data;
import tr.obss.jss.model.User;

@AllArgsConstructor
@Data
public class UserShare {

    private Long id;

    private String name;

    private String surname;

    private String username;

    public UserShare(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.surname = user.getSurname();
        this.username = user.getUsername();
    }
}
