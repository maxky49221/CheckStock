package com.example.csc105Project.models;

import com.example.csc105Project.db.DBConnection;

import javax.sound.sampled.Line;
import java.sql.*;
import java.util.ArrayList;


public class InfoProductQueryModel {
    Connection con;

    public void insertInfo(String serial_number, String name, double price, int quantity, String image, int userId) throws SQLException {
        try {
            con = DBConnection.getMySQLConnection();
            PreparedStatement preparedStatement = con.prepareStatement("INSERT INTO stocks (serial_number, name , price, quantity, imageUrl, ownerId) VALUE (?,?,?,?,?,?)");
            preparedStatement.setString(1, serial_number);
            preparedStatement.setString(2, name);
            preparedStatement.setDouble(3, price);
            preparedStatement.setInt(4, quantity);
            preparedStatement.setString(5, image);
            preparedStatement.setInt(6, userId);
            preparedStatement.execute();
            System.out.println(serial_number);

        } finally {
            con.close();
        }
    }

    public InfoProduct getProduct(int id) throws SQLException {
        try {
            con = DBConnection.getMySQLConnection();
            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM stocks WHERE id = ?");
            preparedStatement.setInt(1, id);
            ResultSet rs = preparedStatement.executeQuery();
            InfoProduct infoProduct = null;
            if (rs.next()) {
                infoProduct = new InfoProduct(rs);
            }
            return infoProduct;
        } finally {
            con.close();
        }
    }


//    public ArrayList<InfoProduct> getInfo(int userId) throws SQLException {
//        try {
//            con = DBConnection.getMySQLConnection();
//            PreparedStatement preparedStatement = con.prepareStatement("SELECT stocks.* , sum(history.reduce) as reduce FROM stocks INNER JOIN  history ON stocks.id = history.product_id WHERE ownerId= ? GROUP BY history.product_id");
//            preparedStatement.setString(1, userId + "");
//            ResultSet rs = preparedStatement.executeQuery();
//            ArrayList<InfoProduct> info = new ArrayList<>();
//            while (rs.next()) {
//                info.add(new InfoProduct(rs));
//            }
//            return info;
//        } finally {
//            con.close();
//        }
//    }


    public  ArrayList<InfoProduct> getInfo(int userId) throws SQLException {
        try {
            con = DBConnection.getMySQLConnection();
            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM stocks WHERE ownerId= ?");
            preparedStatement.setString(1,userId+"");
            ResultSet rs = preparedStatement.executeQuery();
            ArrayList<InfoProduct> info = new ArrayList<>();
            while (rs.next()) {
                info.add(new InfoProduct(rs));
            }
            return info;
        } finally {
            con.close();
        }
    }

    public InfoProduct checkProduct(String serial, int userId) throws SQLException {
        try {
            con = DBConnection.getMySQLConnection();
            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM stocks WHERE serial_number = ? AND ownerId = ?");
            preparedStatement.setString(1, serial);
            preparedStatement.setString(2, userId + "");
            ResultSet rs = preparedStatement.executeQuery();
            InfoProduct product = null;

            if (rs.next()) {
                product = new InfoProduct(rs);
            }
            return product;
        } finally {
            con.close();
        }
    }

    public void updateValue(int numaddre, int product_id) throws SQLException {
        try {
            con = DBConnection.getMySQLConnection();
            PreparedStatement preparedStatement = con.prepareStatement("UPDATE db63130500249.stocks SET quantity = ? WHERE id = ?;");
            preparedStatement.setInt(1, numaddre);
            preparedStatement.setInt(2, product_id);
            preparedStatement.execute();

        } finally {
            con.close();
        }
    }

}
