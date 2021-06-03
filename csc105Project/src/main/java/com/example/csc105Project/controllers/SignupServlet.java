package com.example.csc105Project.controllers;

import com.example.csc105Project.models.ErrorResponse;
import com.example.csc105Project.models.User;
import com.example.csc105Project.models.UserQueryModel;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "SignupServlet", value = "/SignupServlet")
@MultipartConfig
public class SignupServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        response.setContentType("application/json");
        Middleware.setCORS(request, response);
        try {
            String shopname = request.getParameter("shopname");
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String email = request.getParameter("email");

            if(username == null || password == null || email == null || shopname==null) {
                ErrorResponse errorResponse = new ErrorResponse("Shopname, Username ,password and Email are required", 400);
                response.setStatus(400);
                out.print(gson.toJson(errorResponse));
                return;
            }

            UserQueryModel userQueryModel = new UserQueryModel();
            User existingUser = userQueryModel.getUser(username);
            if (existingUser != null) {
                ErrorResponse errorResponse = new ErrorResponse("Username " + username + " is used", 400);
                response.setStatus(400);
                out.print(gson.toJson(errorResponse));
                return;
            }

            User user = userQueryModel.insertNewUser(username, password , email , shopname);
            String jsonOfUser = gson.toJson(user);
            response.setStatus(201);
            request.getSession(true);
            out.print(jsonOfUser);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.toString(), 500);
            response.setStatus(500);
            out.print(gson.toJson(errorResponse));
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Middleware.setCORS(req, resp);
        super.doOptions(req, resp);
    }
}
