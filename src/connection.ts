import Sequelize from 'sequelize';
import { Course } from './routes/api/course';
import { Batch } from './routes/api/batch';
import { Student } from './routes/api/student';
import { Subject } from './routes/api/subject';
import { Teacher } from './routes/api/teacher';
import { Lecture } from './routes/api/lecture';

export const Op = Sequelize.Op;

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db'
})
// const db = new Sequelize('learningDb', 'user', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         min: 0,
//         max: 5
//     }
// })

export const _Course = db.define<Course, any>('courses', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    courseName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

export const _Batch = db.define<Batch, any>('batches', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    batchName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

export const _Student = db.define<Student, any>('students', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    studentName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

export const _Subject = db.define<Subject, any>('subjects', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subjectName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

export const _Teacher = db.define<Teacher, any>('teachers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    teacherName: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const _Lecture = db.define<Lecture, any>('lectures', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    lectureName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

// Mappers tables :-
export const _BatchStudent = db.define('batch_student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})

export const _BatchTeacher = db.define('batch_teacher', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})

//every course has many batches and batch belong to course
_Course.hasMany(_Batch);
_Batch.belongsTo(_Course);

// every batch has many students and students can have many batches
_Batch.belongsToMany(_Student, { through: { model: _BatchStudent } })
_Student.belongsToMany(_Batch, { through: { model: _BatchStudent } })

// every batch has many teachers and techers can teach in multiple batches
_Batch.belongsToMany(_Teacher, { through: { model: _BatchTeacher } })
_Teacher.belongsToMany(_Batch, { through: { model: _BatchTeacher } })

// every course has multiple subjects
_Course.hasMany(_Subject)

// every teacher teaches particular subject and one subject has many teacher
_Teacher.belongsTo(_Subject);
_Subject.hasMany(_Teacher);

// batch has many lectures and lecture belongs to subject and lecture belongs to teacher
_Batch.hasMany(_Lecture);
_Lecture.belongsTo(_Batch);

db.sync({ force: true })
    .then(() => console.log('Database created and synced successfully'))
    .catch((err) => console.log('error creating db' + err))