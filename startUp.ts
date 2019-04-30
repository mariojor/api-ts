import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import Db from "./infra/db";
import NewsController from "./controller/newsController";
import Auth from "./infra/auth";

class StartUp {
    public app: express.Application;
    private _db: Db;

    constructor() {
        this.app = express();
        this._db = new Db();
        this._db.createConnection();
        this.middler();
        this.routes();
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,POST,DELETE,PUT,OPTIONS",
            origin: "*"
        }

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

        this.app.route('/').get((req, res) => {
            res.send({ versao: "0.0.1" })
        });

        this.app.use(Auth.validate);

        this.app.route("/api/v1/news").get(NewsController.get);
        this.app.route("/api/v1/news/:id").get(NewsController.getById);
        this.app.route("/api/v1/news").post(NewsController.create);
        this.app.route("/api/v1/news/:id").put(NewsController.update);
        this.app.route("/api/v1/news/:id").delete(NewsController.delete);

    }


}

export default new StartUp();