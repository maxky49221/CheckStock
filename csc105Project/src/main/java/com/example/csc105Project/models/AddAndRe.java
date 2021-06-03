package com.example.csc105Project.models;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AddAndRe {
    int add;
    int reduce;
    String time;

    public AddAndRe(int add , int reduce, String time) {

        this.add = add;
        this.reduce = reduce;
        this.time = time;
    }
    public AddAndRe(ResultSet rs) throws SQLException {
        this.add = rs.getInt("add");
        this.reduce = rs.getInt("reduce");
        this.time = rs.getString("time");
    }


    public int getAdda() {
        return add;
    }

    public void setAdd(int add) {
        this.add = add;
    }

    public int getReduce() {
        return reduce;
    }

    public void setReduce(int reduce) {
        this.reduce = reduce;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

}
