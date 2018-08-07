package fi.academy.keskustelupalsta.exceptions;

public class TopicNotFoundException  extends RuntimeException{
    public TopicNotFoundException(String s) {
        super(s);
    }
}
