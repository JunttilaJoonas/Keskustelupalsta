package fi.academy.keskustelupalsta.controllers;

import fi.academy.keskustelupalsta.entities.Message;
import fi.academy.keskustelupalsta.exceptions.MessageNotFoundException;
import fi.academy.keskustelupalsta.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/messages")
public class MessageController {
    private MessageRepository messageRepository;

    @Autowired
    public MessageController(MessageRepository repository) {
        this.messageRepository = repository;
    }

    @GetMapping
    public List<Message> getAll(){
        return messageRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Message> getOne(@PathVariable int id){
        return messageRepository.findById(id);
    }

    @PostMapping
    public ResponseEntity<?> addOne(@RequestBody Message message) {
        message.setTimestamp(new Timestamp(System.currentTimeMillis()));
        messageRepository.save(message);
        int id = message.getId();
        URI location = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host("localhost")
                .port(8080)
                .path("/messages/{id}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @PutMapping("/{id}")
    public void editOne(@RequestBody Message editedMessage, @PathVariable int id) {
        Message message = messageRepository.findById(id).orElseThrow(() -> new MessageNotFoundException("Ei löydy"));
        message.setText(editedMessage.getText());
        messageRepository.save(message);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOne(@PathVariable int id){
        messageRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
