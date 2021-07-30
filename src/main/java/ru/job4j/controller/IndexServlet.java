package ru.job4j.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import ru.job4j.model.Item;
import ru.job4j.model.User;
import ru.job4j.store.HbmStore;
import ru.job4j.store.Store;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collection;

public class IndexServlet extends HttpServlet {
    private static final Gson GSON = new GsonBuilder().create();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json; charset=utf-8");
        Store store = HbmStore.instOf();
        User user = (User) req.getSession().getAttribute("user");
        Collection<Item> items = store.findAll(user);
        OutputStream out = resp.getOutputStream();
        String json = GSON.toJson(items);
        out.write(json.getBytes(StandardCharsets.UTF_8));
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        BufferedReader reader = req.getReader();
        String str = reader.readLine();
        User user = (User) req.getSession().getAttribute("user");
        Item item = GSON.fromJson(str, Item.class);
        item.setUser(user);
        HbmStore.instOf().save(item);
        doGet(req, resp);
    }
}
