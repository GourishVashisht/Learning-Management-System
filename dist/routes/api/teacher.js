"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../../connection");
var express_1 = require("express");
var route = express_1.Router();
var Teacher = (function () {
    function Teacher(id, teacherName) {
        this.id = id;
        this.teacherName = teacherName;
    }
    return Teacher;
}());
exports.Teacher = Teacher;
route.get('/', function (req, res) {
    connection_1._Teacher.findAll()
        .then(function (teachers) {
        res.status(200).json(teachers);
    })
        .catch(function (err) {
        res.status(500).send(err);
    });
});
route.get('/:id', function (req, res) {
    connection_1._Teacher.find({
        where: {
            id: req.params.id
        }
    })
        .then(function (teacher) {
        res.status(200).json(teacher);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.post('/', function (req, res) {
    connection_1._Teacher.create({
        teacherName: req.body.teacherName
    })
        .then(function (teacher) {
        res.status(200).json(teacher);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.delete('/:id', function (req, res) {
    connection_1._Teacher.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function () {
        res.status(200).json({
            "success": "deleted the teacher from list"
        });
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.put('/:id', function (req, res) {
    connection_1._Teacher.update({
        teacherName: req.body.teacherName
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(function (teacher) {
        res.status(200).json(teacher);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.get('/:id/batches', function (req, res) {
    connection_1._BatchTeacher.findAll({
        where: {
            teacherId: req.params.id
        }
    })
        .then(function (batches_teachers) {
        var batchIdArray = [];
        for (var _i = 0, batches_teachers_1 = batches_teachers; _i < batches_teachers_1.length; _i++) {
            var batchStudentObject = batches_teachers_1[_i];
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
    connection_1._BatchTeacher.create({
        batchId: req.body.batchId,
        studentId: req.params.id
    })
        .then(function (batchTeacher) {
        res.status(200).json(batchTeacher);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
exports.default = route;
