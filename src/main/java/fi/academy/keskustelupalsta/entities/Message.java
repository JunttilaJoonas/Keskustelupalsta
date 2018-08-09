package fi.academy.keskustelupalsta.entities;

import javax.persistence.*;

import java.sql.Timestamp;

@Entity
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
    private Timestamp timestamp;
//    @Lob
    @Column(columnDefinition = "TEXT")
    private String text;
    @ManyToOne @JoinColumn
    private User userid;
    @ManyToOne @JoinColumn
    private Topic topicid;

    public Message() {
    }

    public Message(String text, User userid, Topic topicid) {
        this.text = text;
        this.userid = userid;
        this.topicid = topicid;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public User getUserid() {
        return userid;
    }

    public void setUserid(User userid) {
        this.userid = userid;
    }

    public Topic getTopicid() {
        return topicid;
    }

    public void setTopicid(Topic topicid) {
        this.topicid = topicid;
    }
}
