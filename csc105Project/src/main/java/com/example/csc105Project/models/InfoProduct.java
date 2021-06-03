package com.example.csc105Project.models;

import java.sql.ResultSet;
import java.sql.SQLException;

public class InfoProduct {
    private String serial;
    private String name;
    private double price;
    private int number;
    private int id;
    private String img;
//    private int reduce;


    public InfoProduct(String serial, String name, double price, int number, int id, String img ) {
        this.serial = serial;
        this.name = name;
        this.price = price;
        this.number = number;
        this.id = id;
        this.img = img;
//        this.reduce = reduce;
    }

    public InfoProduct(ResultSet rs) throws SQLException {
        this.serial = rs.getString("serial_number");
        this.name = rs.getString("name");
        this.price = rs.getDouble("price");
        this.number = rs.getInt("quantity");
        this.id = rs.getInt("id");
        this.img = rs.getString("imageUrl");
//        this.reduce = rs.getInt("reduce");
    }

    public String getSerial() {
        return serial;
    }

    public void setSerial(String serial) {
        this.serial = serial;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


}
