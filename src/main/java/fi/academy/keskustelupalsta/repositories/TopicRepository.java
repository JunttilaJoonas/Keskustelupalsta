package fi.academy.keskustelupalsta.repositories;

import fi.academy.keskustelupalsta.entities.Topic;
import org.springframework.data.repository.CrudRepository;

public interface TopicRepository extends CrudRepository<Topic, Integer> {
}
