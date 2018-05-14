"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../../connection");
var express_1 = require("express");
var route = express_1.Router();
var Student = (function () {
    function Student(id, studentName) {
        this.id = id;
        this.studentName = studentName;
    }
    return Student;
}());
exports.Student = Student;
route.get('/', function (req, res) {
    connection_1._Student.findAll()
        .then(function (students) {
        res.status(200).json(students);
    })
        .catch(function (err) {
        res.status(500).send(err);
    });
});
route.get('/:id', function (req, res) {
    connection_1._Student.find({
        where: {
            id: req.params.id
        }
    })
        .then(function (student) {
        res.status(200).json(student);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.post('/', function (req, res) {
    connection_1._Student.create({
        studentName: req.body.studentName
    })
        .then(function (student) {
        res.status(200).json(student);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.delete('/:id', function (req, res) {
    connection_1._Student.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function () {
        res.status(200).json({
            "success": "deleted the student from list"
        });
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.put('/:id', function (req, res) {
    connection_1._Student.update({
        studentName: req.body.studentName
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(function (value) {
        res.status(200).json(value);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.get('/:id/batches', function (req, res) {
    connection_1._BatchStudent.findAll({
        where: {
            studentId: req.params.id
        }
    })
        .then(function (batches_students) {
        var batchIdArray = [];
        for (var _i = 0, batches_students_1 = batches_students; _i < batches_students_1.length; _i++) {
            var batchStudentObject = batches_students_1[_i];
            batchIdArray.push(batchStudentObject.batchId);
        }
        connection_1._Batch.findAll({
            attributes: ['id', 'batchName'],
            where: {
                id: { $in: batchIdArray }
            },
            order: [
                ['id', 'ASC']
            ]
        })
            .then(function (batches) {
            res.status(200).json(batches);
        })
            .catch(function (err) {
            res.status(500).json(err);
        });
    });
});
route.post('/:id/batches', function (req, res) {
    connection_1._BatchStudent.create({
        batchId: req.body.batchId,
        studentId: req.params.id
    })
        .then(function (batchStudent) {
        res.status(200).json(batchStudent);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
exports.default = route;
