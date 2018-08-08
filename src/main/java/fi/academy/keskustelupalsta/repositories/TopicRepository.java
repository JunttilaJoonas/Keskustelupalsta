package fi.academy.keskustelupalsta.repositories;

import fi.academy.keskustelupalsta.entities.Topic;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TopicRepository extends CrudRepository<Topic, Integer> {
    List<Topic> findAll();
}
