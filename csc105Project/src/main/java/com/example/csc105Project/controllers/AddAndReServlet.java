package com.example.csc105Project.controllers;

import com.example.csc105Project.models.*;
import com.google.gson.Gson;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.time.LocalDateTime;

@WebServlet(name = "AddAndReServlet", value = "/AddAndReServlet")
@MultipartConfig
public class AddAndReServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        response.setContentType("application/json");
        Middleware.setCORS(request, response);
        try {
            int userId = Middleware.checkAuthentication(request, response);
            AddAndReQueryModel addAndReQueryModel = new AddAndReQueryModel();
            ArrayList<AddAndRe> producthis =  addAndReQueryModel.getHisInfo(userId);
            out.print(gson.toJson(producthis));
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
            try{
                String product_id = request.getParameter("product_id");
                if (product_id == null) {
                    ErrorResponse errorResponse = new ErrorResponse("product id is null", 400);
                    response.setStatus(400);
                    out.print(gson.toJson(errorResponse));
                    return;
                }
                ArrayList<AddAndRe> history = new AddAndReQueryModel().getHistory(Integer.parseInt(product_id));
                out.print(gson.toJson(history));
                response.setStatus(200);

            }catch (Exception e){
                ErrorResponse errorResponse = new ErrorResponse(e.toString(), 500);
                response.setStatus(500);
                out.print(gson.toJson(errorResponse));
            }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        response.setContentType("application/json");
        Middleware.setCORS(request, response);
        try{
            String product_id = request.getParameter("product_id");
            String add = request.getParameter("add");
            String reduce = request.getParameter("reduce");
            if (product_id == null) {
                ErrorResponse errorResponse = new ErrorResponse("product id is null", 400);
                response.setStatus(400);
                out.print(gson.toJson(errorResponse));
                return;
            }
            new AddAndReQueryModel().insertHistory(Integer.parseInt(add),Integer.parseInt(reduce),Integer.parseInt(product_id));
            InfoProductQueryModel operator = new InfoProductQueryModel();
            InfoProduct product = operator.getProduct(Integer.parseInt(product_id));
            int newQuantity = product.getNumber()+ Integer.parseInt(add) - Integer.parseInt(reduce);
            operator.updateValue(newQuantity,product.getId());
            response.setStatus(200);




        }catch (Exception e){
            ErrorResponse errorResponse = new ErrorResponse(e.toString(), 500);
            response.setStatus(500);
            out.print(gson.toJson(errorResponse));
            e.printStackTrace();
        }
    }

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Middleware.setCORS(req, resp);
        super.doOptions(req, resp);
    }
}
