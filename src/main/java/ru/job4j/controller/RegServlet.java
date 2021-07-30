package ru.job4j.controller;

import ru.job4j.model.User;
import ru.job4j.store.HbmStore;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class RegServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/reg.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String login = req.getParameter("login");
        String password = req.getParameter("password");
        User user = HbmStore.instOf().getUser(User.of(login, password));
        if (user == null) {
            HbmStore.instOf().addUser(User.of(login, password));
            req.getRequestDispatcher("auth.jsp").forward(req, resp);
        } else {
            req.setAttribute("error", "Такой логин существует, выберите другой");
            doGet(req, resp);
        }
    }
}
