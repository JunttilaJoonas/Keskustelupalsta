package fi.academy.keskustelupalsta.controllers;

import fi.academy.keskustelupalsta.entities.User;
import fi.academy.keskustelupalsta.exceptions.UserNotFoundException;
import fi.academy.keskustelupalsta.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    private UserRepository userRepository;
    
    public UserController(@Autowired UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping()
    public Iterable<User> users() {
        return userRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public User getOne(@PathVariable(name="id") int id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Käyttäjää ei löydy"));
    }
    
    @PostMapping
    public ResponseEntity<?> addOne(@RequestBody User user){
        userRepository.save(user);
        int id = user.getId();
        URI location = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("localhost")
                .port(8080)
                .path("/users/{id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(location).build();
    }
    
    @PutMapping("/{id}")
    public void editOne(@RequestBody User editedUser, @PathVariable int id){
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("Käyttäjää ei löydy"));
        editedUser.setId(user.getId());
        userRepository.save(editedUser);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOne(@PathVariable int id){
        userRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> validationError(Exception ex) {
        return ResponseEntity.notFound().build();
    }
}
