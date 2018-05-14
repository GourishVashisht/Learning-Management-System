"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../../connection");
var express_1 = require("express");
var route = express_1.Router();
var Batch = (function () {
    function Batch(id, batchName) {
        this.id = id;
        this.batchName = batchName;
    }
    return Batch;
}());
exports.Batch = Batch;
route.get('/', function (req, res) {
    connection_1._Batch.findAll()
        .then(function (batches) {
        res.status(200).json(batches);
    })
        .catch(function (err) {
        res.status(500).send(err);
    });
});
route.get('/:id', function (req, res) {
    connection_1._Batch.find({
        where: {
            id: req.params.id
        }
    })
        .then(function (batch) {
        res.status(200).json(batch);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.post('/', function (req, res) {
    connection_1._Batch.create({
        batchName: req.body.batchName
    })
        .then(function (batch) {
        res.status(200).json(batch);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
exports.default = route;
