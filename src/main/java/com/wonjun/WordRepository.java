package com.wonjun;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word, Integer> {

    // custom query to search the word by title or content
    List<Word> findByTitleContainingOrContentContaining(String text, String textAgain);

}