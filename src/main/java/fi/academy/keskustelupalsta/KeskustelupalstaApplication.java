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
            userRepository.save(user);;

            Topic topic = new Topic("otsikkoni", user);
            topicRepository.save(topic);

            Message message = new Message("tämä on viestin sisältö", user, topic);
            messageRepository.save(message);
        };
    }
}
