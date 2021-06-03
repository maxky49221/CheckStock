package com.example.csc105Project.models;

import com.example.csc105Project.db.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;

public class AddAndReQueryModel {
    Connection con;

    public void insertHistory(int add , int reduce , int product_id) throws SQLException {
        try {
            con = DBConnection.getMySQLConnection();
            LocalDateTime time = LocalDateTime.now();
            String t =time+"";
            t = t.replace('T',' ');
            t = t.substring(0,19);
            PreparedStatement preparedStatement = con.prepareStatement("INSERT INTO `history` (`add` ,`reduce` , `product_id` , `time`) VALUES (?,?,?,?) ");
            preparedStatement.setInt(1, add);
            preparedStatement.setInt(2,reduce);
            preparedStatement.setInt(3,product_id);
            preparedStatement.setString(4,t);
            preparedStatement.execute();
        } finally {
            con.close();
        }
    }

    public ArrayList<AddAndRe> getHistory(int productid) throws SQLException {
        try {
            con = DBConnection.getMySQLConnection();
            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM history  WHERE product_id = ?");
            preparedStatement.setInt(1, productid);
            ResultSet rs = preparedStatement.executeQuery();
            ArrayList<AddAndRe> history = new ArrayList<AddAndRe>();
            while (rs.next()) {
                history.add(new AddAndRe(rs));
            }
            return history;
        } finally {
            con.close();
        }
    }

    public  ArrayList<AddAndRe> getHisInfo(int proid) throws SQLException {
        try {
            con = DBConnection.getMySQLConnection();
            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM history  WHERE product_id= ?");
            preparedStatement.setString(1,proid+"");
            ResultSet rs = preparedStatement.executeQuery();
            ArrayList<AddAndRe> infohis = new ArrayList<>();
            while (rs.next()) {
                infohis.add(new AddAndRe(rs));
            }
            return infohis;
        } finally {
            con.close();
        }
    }

}
