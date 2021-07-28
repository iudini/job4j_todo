package ru.job4j.store;

import ru.job4j.model.Item;

import java.util.Collection;

public interface Store {

    Collection<Item> findAll();

    void save(Item item);

    void update(Item item);
}
