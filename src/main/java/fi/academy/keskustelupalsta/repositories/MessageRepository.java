package fi.academy.keskustelupalsta.repositories;

import fi.academy.keskustelupalsta.entities.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Integer> {
    List<Message> findAll();
}
