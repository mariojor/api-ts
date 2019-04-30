"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const configs_1 = require("./configs");
class Auth {
    validate(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, configs_1.default.secret, function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        sucess: false,
                        message: "403 - Token invalido"
                    });
                }
                else {
                    next();
                }
            });
        }
        else {
            return res.status(401).send({
                sucess: false,
                message: "401 - sem autorização"
            });
        }
    }
}
exports.default = new Auth();
