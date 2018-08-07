package fi.academy.keskustelupalsta.repositories;

import fi.academy.keskustelupalsta.entities.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findAll();
}
