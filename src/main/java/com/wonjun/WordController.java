package com.wonjun;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class WordController {

    @Autowired
    WordRepository wordRepository;

    @GetMapping("/words")
    public List<Word> index(){
        return wordRepository.findAll();
    }
/*
    @GetMapping("/word/{id}")
    public Word show(@PathVariable String id){
        int wordId = Integer.parseInt(id);
        return wordRepository.findOne(wordId);
    }
*/

    @GetMapping("/word/{wordTitle}")
    public Word search(@PathVariable String wordTitle){
        String searchWord = wordTitle;
        return wordRepository.findOneByTitle(searchWord);
    }

    @GetMapping("/word/searchdata/{wordTitle}")
    public SearchResult getSearchResult(@PathVariable String wordTitle) {
        NaverSearchAPI searchAPI = new NaverSearchAPI();
        searchAPI.request(wordTitle);
        return searchAPI.getResultJsonObject();
    }

    @PostMapping("/word/search")
    public Word search(@RequestBody Map<String, String> body){
        String searchTerm = body.get("word");
        return wordRepository.findOneByTitle(searchTerm);
    }

    @PostMapping("/word")
    public Word create(@RequestBody Map<String, String> body){
        String title = body.get("title");
        String content = body.get("content");

        // check if word exists
        Word word = wordRepository.findOneByTitle(title);
        if (word != null) {
            return null;
        }
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

    @DeleteMapping("/word/{id}")
    public boolean delete(@PathVariable String id){
        int wordId = Integer.parseInt(id);
        wordRepository.deleteById(wordId);
        return true;
    }

}