package com.wonjun;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Integer> {

    default Word findOne(Integer id) {
        return (Word) findById(id).orElse(null);
    }

    // custom query to search the word by title or content
    List<Word> findByTitleContainingOrContentContaining(String text, String textAgain);

    // custom query fo search the word by title
    Word findOneByTitle(String text);

}