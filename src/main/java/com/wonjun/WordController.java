package com.wonjun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class WordController {

    @Autowired
    WordRepository wordRepository;

    @GetMapping("/word")
    public List<Word> index(){
        return wordRepository.findAll();
    }

    @GetMapping("/word/{id}")
    public Word show(@PathVariable String id){
        int wordId = Integer.parseInt(id);
        return wordRepository.findOne(wordId);
    }

    @PostMapping("/word/search")
    public List<Word> search(@RequestBody Map<String, String> body){
        String searchTerm = body.get("text");
        return wordRepository.findByTitleContainingOrContentContaining(searchTerm, searchTerm);
    }

    @PostMapping("/word")
    public Word create(@RequestBody Map<String, String> body){
        String title = body.get("title");
        String content = body.get("content");
        return wordRepository.save(new Word(title, content));
    }

    @PutMapping("/word/{id}")
    public Word update(@PathVariable String id, @RequestBody Map<String, String> body){
        int wordId = Integer.parseInt(id);
        // getting word
        Word word = wordRepository.findOne(wordId);
        word.setTitle(body.get("title"));
        word.setContent(body.get("content"));
        return wordRepository.save(word);
    }

    @DeleteMapping("word/{id}")
    public boolean delete(@PathVariable String id){
        int wordId = Integer.parseInt(id);
        wordRepository.delete(wordId);
        return true;
    }

}