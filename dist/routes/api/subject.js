"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../../connection");
var express_1 = require("express");
var route = express_1.Router();
var Subject = (function () {
    function Subject(id, subjectName) {
        this.id = id;
        this.subjectName = subjectName;
    }
    return Subject;
}());
exports.Subject = Subject;
route.get('/', function (req, res) {
    connection_1._Subject.findAll()
        .then(function (subjects) {
        res.status(200).json(subjects);
    })
        .catch(function (err) {
        res.status(500).send(err);
    });
});
route.get('/:id', function (req, res) {
    connection_1._Subject.find({
        where: {
            id: req.params.id
        }
    })
        .then(function (subject) {
        res.status(200).json(subject);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.post('/', function (req, res) {
    connection_1._Subject.create({
        subjectName: req.body.subjectName
    })
        .then(function (subject) {
        res.status(200).json(subject);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.delete('/:id', function (req, res) {
    connection_1._Subject.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function () {
        res.status(200).json({
            "success": "deleted the subject from list"
        });
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.put('/:id', function (req, res) {
    connection_1._Subject.update({
        subjectName: req.body.studentName
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(function (subject) {
        res.status(200).json(subject);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.get('/:id/teachers', function (req, res) {
    connection_1._Teacher.findAll({
        where: {
            subjectId: req.params.id
        }
    })
        .then(function (teachers) {
        res.status(200).json(teachers);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.post('/:id/teachers', function (req, res) {
    connection_1._Teacher.create({
        techerName: req.body.teacherName,
        subjectId: req.params.id
    })
        .then(function (teacher) {
        res.status(200).json(teacher);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
exports.default = route;
