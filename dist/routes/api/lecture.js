"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var route = express_1.Router();
var Lecture = (function () {
    function Lecture(id, lectureName) {
        this.id = id;
        this.lectureName = lectureName;
    }
    return Lecture;
}());
exports.Lecture = Lecture;
exports.default = route;
