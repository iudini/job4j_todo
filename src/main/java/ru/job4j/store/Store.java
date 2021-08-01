package ru.job4j.store;

import ru.job4j.model.Category;
import ru.job4j.model.Item;
import ru.job4j.model.User;

import java.util.Collection;

public interface Store {

    Collection<Item> findAll(User user);

    void save(Item item, String[] ids);

    Collection<Category> findAllCategories();

    void update(Item item);

    void addUser(User user);

    User getUser(User user);
}
