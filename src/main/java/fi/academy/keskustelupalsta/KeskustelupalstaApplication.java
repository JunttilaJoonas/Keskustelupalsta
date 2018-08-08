package fi.academy.keskustelupalsta;

import fi.academy.keskustelupalsta.entities.Message;
import fi.academy.keskustelupalsta.entities.Topic;
import fi.academy.keskustelupalsta.entities.User;
import fi.academy.keskustelupalsta.repositories.MessageRepository;
import fi.academy.keskustelupalsta.repositories.TopicRepository;
import fi.academy.keskustelupalsta.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class KeskustelupalstaApplication {

    public static void main(String[] args) {
        SpringApplication.run(KeskustelupalstaApplication.class, args);
    }

    @Bean
    @Autowired
    public CommandLineRunner init(MessageRepository messageRepository, TopicRepository topicRepository, UserRepository userRepository) {
        return args -> {
            User user = new User("Testikayttaja", "testi@kayttaja.fi");
            userRepository.save(user);

            List<Topic> topics = new ArrayList<>();
            topics.add(new Topic("otsikko", user));
            topics.add(new Topic("otsikko2", user));
            topics.add(new Topic("otsikko3", user));
            topics.add(new Topic("otsikko4", user));
            topics.add(new Topic("otsikko5", user));
            topics.add(new Topic("otsikko6", user));
            topics.add(new Topic("otsikko7", user));
            topics.forEach(topicRepository::save);
            
            List<Message> messages = new ArrayList<>();
            messages.add(new Message("viestin sisältö", user, topics.get(0)));
            messages.add(new Message("viestin sisältö", user, topics.get(0)));
            messages.add(new Message("viestin sisältö", user, topics.get(0)));
            messages.add(new Message("viestin sisältö", user, topics.get(1)));
            messages.add(new Message("viestin sisältö", user, topics.get(1)));
            messages.add(new Message("viestin sisältö", user, topics.get(1)));
            messages.add(new Message("viestin sisältö", user, topics.get(2)));
            messages.add(new Message("viestin sisältö", user, topics.get(2)));
            messages.add(new Message("viestin sisältö", user, topics.get(2)));
            messages.add(new Message("viestin sisältö", user, topics.get(3)));
            messages.add(new Message("viestin sisältö", user, topics.get(3)));
            messages.forEach(messageRepository::save);
        };
    }
}
