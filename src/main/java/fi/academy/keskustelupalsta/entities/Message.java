package fi.academy.keskustelupalsta.entities;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Timestamp;

public class Message {
    @Id @GeneratedValue
    private int id;
    private Timestamp timestamp;
    private String text;
    private int userid;
    private int topicid;


}
