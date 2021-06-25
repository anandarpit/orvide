const createError = require(`http-errors`);
const router = require("express").Router();
const testSchema = require("../../model/user/test");
const connect = require("../../helpers/connection");




function getData() {
    connect.then(async (db) => {
        const RegEmail = new testSchema({
            email: [{ name: "ag;dt" , email: "aldggi" }]
        });

        await RegEmail.save((err, doc) => {
            if (doc) {
                console.log(doc);
            } else {
                console.error(err);
            }
        })
    })
}

getData();
