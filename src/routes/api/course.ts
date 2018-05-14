import { _Course, _BatchTeacher, _Batch, _Lecture, _BatchStudent, _Student, _Teacher } from '../../connection';
import { Request, Router } from 'express';
import { Batch } from './batch';

const route: Router = Router();

export class Course {
    public id: number;
    public courseName: string;
    constructor(id: number, courseName: string) {
        this.id = id;
        this.courseName = courseName;
    }
}

route.get('/', (req: Request, res: any) => {
    _Course.findAll()
        .then((courses: Course[]) => {
            res.status(200).json(courses);
        })
        .catch((err: any) => {
            res.status(500).send(err);
        })
})

route.get('/:id', (req: Request, res: any) => {
    _Course.find({
        where: {
            id: req.params.id
        }
    })
        .then((course: any) => {
            res.status(200).json(course);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.post('/', (req: Request, res: any) => {
    _Course.create({
        courseName: req.body.courseName
    })
        .then((course: any) => {
            res.status(200).json(course)
        })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})

route.get('/:id/batches', (req: Request, res: any) => {
    _Batch.findAll({
        attributes: ['id', 'batchName'],
        include: [{
            model: _Course
        }],
        where: {
            courseId: req.params.id
        }
    })
        .then((batches: any) => {
            res.status(200).json(batches)
        })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})

route.post('/:id/batches', (req: Request, res: any) => {
    _Batch.create({
        batchName: req.body.name,
        courseId: req.params.id
    }).then((batch: Batch) => {
        res.status(200).json(batch)
    })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})

route.get('/:cid/batches/:bid', (req: Request, res: any) => {
    _Batch.findOne({
        where: {
            courseId: req.params.cid,
            id: req.params.bid
        }
    }).then((batch: any) => {
        res.status(200).json(batch)
    })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.delete('/:cid/batches/:bid', (req: Request, res: any) => {
    _Batch.destroy({
        where: {
            courseId: req.params.cid,
            id: req.params.bid
        }
    }).then((list) => {
        res.status(200).json(list)
    })
        .catch((err: any) => res.status(500).json(err))
})

route.get('/:cid/batches/:bid/lectures', (req: Request, res: any) => {
    _Lecture.findAll({
        where: {
            batchId: req.params.bid,
        }
    }).then((list) => res.status(200).json(list))
        .catch((err) => res.status(500).json(err))
})

route.post('/:cid/batches/:bid/lectures', (req: Request, res: any) => {
    _Lecture.create({
        lectureName: req.body.name,
        batchId: req.params.bid
    }).then((obj) => res.status(200).json(obj))
        .catch((err) => res.status(500).json(err))
})

route.get('/:cid/batches/:bid/students', (req: Request, res: any) => {
    _BatchStudent.findAll({
        where: {
            batchId: req.params.bid
        }
    })
        .then((batches: any[]) => {
            let batchIdArray: number[] = [];
            for (let batchStudentObject of batches) {
                batchIdArray.push(batchStudentObject.batchId);
            }
            _Student.findAll({
                where: {
                    id: { $in: batchIdArray }
                }
            })
                .then((list) => res.status(200).json(list))
                .catch((err) => res.status(500).json(err))
        })
})

route.get('/:cid/batches/:bid/teachers', (req: Request, res: any) => {
    _BatchTeacher.findAll({
        where: {
            batchId: req.params.bid
        }
    })
        .then((batches: any[]) => {
            let batchIdArray: number[] = [];
            for (let batchTeacherObject of batches) {
                batchIdArray.push(batchTeacherObject.batchId);
            }
            _Teacher.findAll({
                where: {
                    id: { $in: batchIdArray }
                }
            })
                .then((list) => res.status(200).json(list))
                .catch((err) => res.status(500).json(err))
        })
})

export default route;