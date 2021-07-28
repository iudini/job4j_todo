package ru.job4j.store;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import ru.job4j.model.Item;

import java.util.Collection;
import java.util.List;

public class HbmStore implements Store, AutoCloseable {
    private final StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
            .configure().build();
    private final SessionFactory sf = new MetadataSources(registry)
            .buildMetadata().buildSessionFactory();

    private static final class Lazy {
        private static final Store INST = new HbmStore();
    }

    public static Store instOf() {
        return Lazy.INST;
    }

    @Override
    public Collection<Item> findAll() {
        Session session = sf.openSession();
        session.beginTransaction();
        List<Item> list = session.createQuery("from ru.job4j.model.Item order by done, created").list();
        session.getTransaction().commit();
        session.close();
        return list;
    }

    @Override
    public void update(Item item) {
        Session session = sf.openSession();
        session.beginTransaction();
        Item itemWithId = (Item) session.createQuery("from ru.job4j.model.Item where id=" + item.getId())
                .getSingleResult();
        itemWithId.setDone(true);
        session.update(itemWithId);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void save(Item item) {
        Session session = sf.openSession();
        session.beginTransaction();
        session.save(item);
        session.getTransaction().commit();
        session.close();
    }

    @Override
    public void close() throws Exception {
        StandardServiceRegistryBuilder.destroy(registry);
    }
}
