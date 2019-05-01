"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsService_1 = require("../services/newsService");
const helper_1 = require("../infra/helper");
const HttpStatus = require("http-status");
const redis = require("redis");
class NewsController {
    get(req, res) {
        let client = redis.createClient();
        client.get('news', function (err, reply) {
            if (reply) {
                console.log('redis');
                helper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
            }
            else {
                newsService_1.default.get()
                    .then(news => {
                    console.log('db');
                    client.set('news', JSON.stringify(news));
                    client.expire('news', 20);
                    helper_1.default.sendResponse(res, HttpStatus.OK, news);
                })
                    .catch(error => console.error.bind(console, `Error ${error}`));
            }
        });
    }
    getById(req, res) {
        const _id = req.params.id;
        newsService_1.default.getById(_id)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    create(req, res) {
        let vm = req.body;
        newsService_1.default.create(vm)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, "Noticia cadastrada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    update(req, res) {
        const _id = req.params.id;
        let vm = req.body;
        newsService_1.default.update(_id, vm)
            .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, `Noticia  atualizada com sucesso!`))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        newsService_1.default.delete(_id)
            .then(() => helper_1.default.sendResponse(res, HttpStatus.OK, "Noticia deletada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}
exports.default = new NewsController();
