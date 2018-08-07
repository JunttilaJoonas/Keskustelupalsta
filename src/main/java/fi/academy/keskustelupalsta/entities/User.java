package fi.academy.keskustelupalsta.entities;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

public class User {
    @Id @GeneratedValue
    private int id;
    private String username;
    private String email;
    private String firstname;
    private String lastname;
    private LocalDate birthdate;
    private String password;
    private String type;
}
