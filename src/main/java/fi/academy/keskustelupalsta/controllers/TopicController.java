package fi.academy.keskustelupalsta.controllers;

import fi.academy.keskustelupalsta.entities.Message;
import fi.academy.keskustelupalsta.entities.Topic;
import fi.academy.keskustelupalsta.exceptions.TopicNotFoundException;
import fi.academy.keskustelupalsta.repositories.MessageRepository;
import fi.academy.keskustelupalsta.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.sql.Timestamp;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/topics")
public class TopicController {
    private MessageRepository messageRepository;
    private TopicRepository topicRepository;
    @Autowired
    public TopicController( TopicRepository topicRepository, MessageRepository messageRepository) {
        this.topicRepository = topicRepository;
        this.messageRepository = messageRepository;
    }

    @GetMapping("/{id}")
    public Topic getOne(@PathVariable(name="id") int id) {
        Optional<Topic> optionalTopic = topicRepository.findById(id);
        if (optionalTopic.isPresent()) {
            return optionalTopic.get();
        }
       throw new TopicNotFoundException("Topic not found.");
    }

    @GetMapping
    public List<Topic> getAll () {
        List<Topic> allTopics = topicRepository.findAll();
        allTopics.sort(Comparator.comparing(Topic::getTimestamp).reversed());
        return allTopics;
    }

    @PostMapping
    public ResponseEntity<?> createNew(@RequestBody Topic topic) {
        topic.setTimestamp(new Timestamp(System.currentTimeMillis()));
        topicRepository.save(topic);
        int id = topic.getId();
        URI location = UriComponentsBuilder.newInstance()
            .scheme("http")
            .host("localhost")
            .port("8080")
            .path("/topics/{id}")
            .buildAndExpand(id)
            .toUri();
    return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOne(@PathVariable int id) {
            topicRepository.deleteById(id);
            return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Topic updatedTopic) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new TopicNotFoundException("Topic not found."));
        topic.setHead(updatedTopic.getHead());
        topicRepository.save(topic);
        return ResponseEntity.ok().build();
    }
}

