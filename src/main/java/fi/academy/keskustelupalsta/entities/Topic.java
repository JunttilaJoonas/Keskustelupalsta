package fi.academy.keskustelupalsta.entities;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Topic {
    @Id @GeneratedValue
    private int id;
    private Timestamp timestamp;
    private String head;
    @ManyToOne
    @JoinColumn
    private User userid;

    public Topic() {
    }

    public Topic(String head, User userid) {
        this.head = head;
        this.userid = userid;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getHead() {
        return head;
    }

    public void setHead(String head) {
        this.head = head;
    }

    public User getUserid() {
        return userid;
    }

    public void setUserid(User userid) {
        this.userid = userid;
    }
}
