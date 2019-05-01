"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db_1 = require("./infra/db");
const uploads_1 = require("./infra/uploads");
const newsRouter_1 = require("./router/newsRouter");
class StartUp {
    constructor() {
        this.app = express();
        this._db = new db_1.default();
        this._db.createConnection();
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,POST,DELETE,PUT,OPTIONS",
            origin: "*"
        };
        this.app.use(cors(options));
    }
    middler() {
        this.enableCors();
        //Para poder trabalhar com json
        this.app.use(bodyParser.json());
        //Para poder trabalhar com queryString 
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        this.app.route("/").get((req, res) => {
            res.send({ versao: "0.0.1" });
        });
        this.app.route("/uploads").post(uploads_1.default.single("file"), (req, res) => {
            try {
                res.send("Arquivo enviado com sucesso.");
            }
            catch (error) {
                console.log(error);
            }
        });
        //this.app.use(Auth.validate);
        this.app.use("/", newsRouter_1.default);
    }
}
exports.default = new StartUp();
