package tr.obss.jss.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;


import javax.persistence.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;


@SuperBuilder
@Data
@NoArgsConstructor
@Entity
public class User extends Person  {

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Products> favoriteList = new HashSet<>();

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Products> basket = new HashSet<>();

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY)
    private Set<Seller> blackList = new HashSet<>();



//    //Her kullanıcının kara listeye aldığı satıcıları tuttuğu bir blackList listesi
//    @OneToOne(fetch = FetchType.LAZY)
//    private BlackList blackLists;
//
//    //Her kullanıcının Favori ürünlerini tuttuğu bir favori listesi
//    @OneToOne(fetch = FetchType.LAZY)
//    private FavoriteList favoriteLists;
}
