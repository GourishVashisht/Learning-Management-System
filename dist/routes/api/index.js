"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var batch_1 = __importDefault(require("./batch"));
var course_1 = __importDefault(require("./course"));
var lecture_1 = __importDefault(require("./lecture"));
var student_1 = __importDefault(require("./student"));
var subject_1 = __importDefault(require("./subject"));
var teacher_1 = __importDefault(require("./teacher"));
var route = express_1.Router();
var routes = {
    batchRoute: batch_1.default, courseRoute: course_1.default, lectureRoute: lecture_1.default, studentRoute: student_1.default, subjectRoute: subject_1.default, techerRoute: teacher_1.default
};
route.use('/batches', routes.batchRoute);
route.use('/courses', routes.courseRoute);
route.use('/lectures', routes.lectureRoute);
route.use('/students', routes.studentRoute);
route.use('/subjects', routes.subjectRoute);
route.use('/teachers', routes.techerRoute);
exports.default = route;
