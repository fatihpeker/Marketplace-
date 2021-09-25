package tr.obss.jss.shared;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class JwtResponse {

    private String token;

    @Builder.Default
    private String type = "Bearer";

    private Long id;

    private String username;

    private List<String> roles;
}
