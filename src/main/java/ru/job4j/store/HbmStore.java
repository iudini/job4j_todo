package ru.job4j.store;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.query.Query;
import ru.job4j.model.Item;
import ru.job4j.model.User;

import java.util.Collection;
import java.util.List;
import java.util.function.Function;

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
    public Collection<Item> findAll(User user) {
        return this.tx(session ->
                session.createQuery("from Item where user=:user order by done, created")
                        .setParameter("user", user)
                        .list());
    }

    @Override
    public void update(Item item) {
        this.tx(session -> {
            session.createQuery("update Item set done = true where id=:id")
                    .setParameter("id", item.getId()).executeUpdate();
            return true;
        });
    }

    @Override
    public void addUser(User user) {
        this.tx(session -> session.save(user));
    }

    @Override
    public User getUser(User user) {
        return this.tx(session -> {
            Query query = session.createQuery("from User where name=:name and password=:password");
            query.setParameter("name", user.getName());
            query.setParameter("password", user.getPassword());
            List<User> users = query.list();
            if (users.isEmpty()) {
                return null;
            }
            return users.get(0);
        });
    }

    @Override
    public void save(Item item) {
        this.tx(session -> session.save(item));
    }

    @Override
    public void close() throws Exception {
        StandardServiceRegistryBuilder.destroy(registry);
    }

    private <T> T tx(final Function<Session, T> command) {
        final Session session = sf.openSession();
        final Transaction tx = session.beginTransaction();
        try {
            T rsl = command.apply(session);
            tx.commit();
            return rsl;
        } catch (final Exception e) {
            session.getTransaction().rollback();
            throw e;
        } finally {
            session.close();
        }
    }
}
