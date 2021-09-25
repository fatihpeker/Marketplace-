package tr.obss.jss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication//(exclude = SecurityAutoConfiguration.class)
public class MarketPlaceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MarketPlaceApplication.class, args);
    }

}
