package fi.academy.keskustelupalsta.repositories;

import fi.academy.keskustelupalsta.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {
}
