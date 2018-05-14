"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
exports.Op = sequelize_1.default.Op;
var db = new sequelize_1.default('learningDb', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        min: 0,
        max: 5
    }
});
exports._Course = db.define('courses', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    courseName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true
    }
});
exports._Batch = db.define('batches', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    batchName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true
    }
});
exports._Student = db.define('students', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports._Subject = db.define('subjects', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true
    }
});
exports._Teacher = db.define('teachers', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teacherName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports._Lecture = db.define('lectures', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lectureName: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    }
});
exports._BatchStudent = db.define('batch_student', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports._BatchTeacher = db.define('batch_teacher', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports._Course.hasMany(exports._Batch);
exports._Batch.belongsTo(exports._Course);
exports._Batch.belongsToMany(exports._Student, { through: { model: exports._BatchStudent } });
exports._Student.belongsToMany(exports._Batch, { through: { model: exports._BatchStudent } });
exports._Batch.belongsToMany(exports._Teacher, { through: { model: exports._BatchTeacher } });
exports._Teacher.belongsToMany(exports._Batch, { through: { model: exports._BatchTeacher } });
exports._Course.hasMany(exports._Subject);
exports._Teacher.belongsTo(exports._Subject);
exports._Subject.hasMany(exports._Teacher);
exports._Batch.hasMany(exports._Lecture);
exports._Lecture.belongsTo(exports._Batch);
db.sync({ force: true })
    .then(function () { return console.log('Database created and synced successfully'); })
    .catch(function (err) { return console.log('error creating db' + err); });
