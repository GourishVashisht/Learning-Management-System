"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../../connection");
var express_1 = require("express");
var route = express_1.Router();
var Course = (function () {
    function Course(id, courseName) {
        this.id = id;
        this.courseName = courseName;
    }
    return Course;
}());
exports.Course = Course;
route.get('/', function (req, res) {
    connection_1._Course.findAll()
        .then(function (courses) {
        res.status(200).json(courses);
    })
        .catch(function (err) {
        res.status(500).send(err);
    });
});
route.get('/:id', function (req, res) {
    connection_1._Course.find({
        where: {
            id: req.params.id
        }
    })
        .then(function (course) {
        res.status(200).json(course);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.post('/', function (req, res) {
    connection_1._Course.create({
        courseName: req.body.courseName
    })
        .then(function (course) {
        res.status(200).json(course);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.get('/:id/batches', function (req, res) {
    connection_1._Batch.findAll({
        attributes: ['id', 'batchName'],
        include: [{
                model: connection_1._Course
            }],
        where: {
            courseId: req.params.id
        }
    })
        .then(function (batches) {
        res.status(200).json(batches);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.post('/:id/batches', function (req, res) {
    connection_1._Batch.create({
        batchName: req.body.name,
        courseId: req.params.id
    }).then(function (batch) {
        res.status(200).json(batch);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.get('/:cid/batches/:bid', function (req, res) {
    connection_1._Batch.findOne({
        where: {
            courseId: req.params.cid,
            id: req.params.bid
        }
    }).then(function (batch) {
        res.status(200).json(batch);
    })
        .catch(function (err) {
        res.status(500).json(err);
    });
});
route.delete('/:cid/batches/:bid', function (req, res) {
    connection_1._Batch.destroy({
        where: {
            courseId: req.params.cid,
            id: req.params.bid
        }
    }).then(function (list) {
        res.status(200).json(list);
    })
        .catch(function (err) { return res.status(500).json(err); });
});
route.get('/:cid/batches/:bid/lectures', function (req, res) {
    connection_1._Lecture.findAll({
        where: {
            batchId: req.params.bid,
        }
    }).then(function (list) { return res.status(200).json(list); })
        .catch(function (err) { return res.status(500).json(err); });
});
route.post('/:cid/batches/:bid/lectures', function (req, res) {
    connection_1._Lecture.create({
        lectureName: req.body.name,
        batchId: req.params.bid
    }).then(function (obj) { return res.status(200).json(obj); })
        .catch(function (err) { return res.status(500).json(err); });
});
route.get('/:cid/batches/:bid/students', function (req, res) {
    connection_1._BatchStudent.findAll({
        where: {
            batchId: req.params.bid
        }
    })
        .then(function (batches) {
        var batchIdArray = [];
        for (var _i = 0, batches_1 = batches; _i < batches_1.length; _i++) {
            var batchStudentObject = batches_1[_i];
            batchIdArray.push(batchStudentObject.batchId);
        }
        connection_1._Student.findAll({
            where: {
                id: { $in: batchIdArray }
            }
        })
            .then(function (list) { return res.status(200).json(list); })
            .catch(function (err) { return res.status(500).json(err); });
    });
});
route.get('/:cid/batches/:bid/teachers', function (req, res) {
    connection_1._BatchTeacher.findAll({
        where: {
            batchId: req.params.bid
        }
    })
        .then(function (batches) {
        var batchIdArray = [];
        for (var _i = 0, batches_2 = batches; _i < batches_2.length; _i++) {
            var batchTeacherObject = batches_2[_i];
            batchIdArray.push(batchTeacherObject.batchId);
        }
        connection_1._Teacher.findAll({
            where: {
                id: { $in: batchIdArray }
            }
        })
            .then(function (list) { return res.status(200).json(list); })
            .catch(function (err) { return res.status(500).json(err); });
    });
});
exports.default = route;
