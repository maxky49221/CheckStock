package com.example.csc105Project.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    private static final String dbURL = "jdbc:mysql://10.4.53.32:3306/db63130500249";

    public static Connection getMySQLConnection() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(dbURL, "63130500249", System.getenv("db_password"));
            return con;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
