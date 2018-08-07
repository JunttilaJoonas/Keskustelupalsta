package fi.academy.keskustelupalsta.repositories;

import fi.academy.keskustelupalsta.entities.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepository extends CrudRepository<Message, Integer> {
}
