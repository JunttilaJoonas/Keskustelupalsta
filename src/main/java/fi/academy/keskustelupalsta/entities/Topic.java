package fi.academy.keskustelupalsta.entities;

import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;

public class Topic {
    @Id @GeneratedValue
    private int id;
    private Timestamp timestamp;
    private String head;
    private int userid;
}
