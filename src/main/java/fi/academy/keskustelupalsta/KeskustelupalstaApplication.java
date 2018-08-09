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

import java.sql.Timestamp;
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
            long time = System.currentTimeMillis() - 100000000;
            User testi = new User("Testikayttaja", "testi@kayttaja.fi", "salasana");
            User joonas = new User("joonas", "joonas@forum.fi", "salasana");
            User evil = new User("EvilUser_666", "eviluser666@hell.com", "salasana");
            User tommi = new User("Tommi", "tommi@sovelto.fi", "salasana");
            userRepository.save(testi);
            userRepository.save(joonas);
            userRepository.save(evil);
            userRepository.save(tommi);

            List<Topic> topics = new ArrayList<>();
            Topic helppo = new Topic("Tämä on helppo", tommi);
            Topic git = new Topic("Git on parasta",joonas);
            Topic testiaihe = new Topic("Testing testing", testi);
            topics.add(helppo);
            topics.add(git);
            topics.add(testiaihe);

            for (Topic topic : topics) {
                topic.setTimestamp(new Timestamp(time));
                topicRepository.save(topic);
                time -= 1000000000;
            }

            List<Message> messages = new ArrayList<>();
        };
    }
}
