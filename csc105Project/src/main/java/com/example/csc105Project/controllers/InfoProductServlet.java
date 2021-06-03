package com.example.csc105Project.controllers;
import com.example.csc105Project.models.*;

import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


import com.example.csc105Project.models.InfoProductQueryModel;

@WebServlet(name = "InfoProductServlet", value = "/InfoProductServlet")
@MultipartConfig
public class InfoProductServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        response.setContentType("application/json");
        Middleware.setCORS(request, response);
        try {
            int userId = Middleware.checkAuthentication(request, response);
            InfoProductQueryModel infoProductQueryModel = new InfoProductQueryModel();
            ArrayList<InfoProduct> product =  infoProductQueryModel.getInfo(userId);
            out.print(gson.toJson(product));
            response.setStatus(200);

        } catch (Exception | ErrorResponse e) {
            ErrorResponse errorResponse = new ErrorResponse(e.toString(), 500);
            response.setStatus(500);
            out.print(gson.toJson(errorResponse));
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        response.setContentType("application/json");
        Middleware.setCORS(request, response);
        try {
            String serial = request.getParameter("serial");
            String name = request.getParameter("name");
            double price = Double.parseDouble(request.getParameter("price"));
            int number = Integer.parseInt(request.getParameter("number"));
            String image = request.getParameter("imgURL");
            int userId = Middleware.checkAuthentication(request, response);

            if(serial == null || name == null || image==null) {
                ErrorResponse errorResponse = new ErrorResponse("Serial number , name, price and number of product are required", 400);
                response.setStatus(400);
                out.print(gson.toJson(errorResponse));
                return;
            }
            InfoProductQueryModel infoProductQueryModel = new InfoProductQueryModel();
            InfoProduct existingProduct = infoProductQueryModel.checkProduct(serial,userId);
            if (existingProduct != null) {
                System.out.println(existingProduct.getSerial());
                ErrorResponse errorResponse = new ErrorResponse("Serial " + serial + " is used", 400);
                response.setStatus(400);
                out.print(gson.toJson(errorResponse));
                return;
            }
            infoProductQueryModel.insertInfo(serial,name,price,number,image,userId);
            response.setStatus(201);
        } catch (Exception | ErrorResponse e) {
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
