import { _Student, _Batch, _BatchStudent, Op } from '../../connection';
import { Request, Router } from 'express';
import { Batch } from './batch';

const route: Router = Router();

export class Student {
    public id: number;
    public studentName: string;
    constructor(id: number, studentName: string) {
        this.id = id;
        this.studentName = studentName;

    }
}

route.get('/', (req: Request, res: any) => {
    _Student.findAll()
        .then((students: Student[]) => {
            res.status(200).json(students);
        })
        .catch((err: any) => {
            res.status(500).send(err);
        })
})

route.get('/:id', (req: Request, res: any) => {
    _Student.find({
        where: {
            id: req.params.id
        }
    })
        .then((student: any) => {
            res.status(200).json(student);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.post('/', (req: Request, res: any) => {
    _Student.create({
        studentName: req.body.studentName
    })
        .then((student: Student) => {
            res.status(200).json(student)
        })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})

route.delete('/:id', (req: Request, res: any) => {
    _Student.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(200).json({
                "success": "deleted the student from list"
            });
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.put('/:id', (req: Request, res: any) => {
    _Student.update({
        studentName: req.body.studentName
    }, {
            where: {
                id: req.params.id
            }
        })
        .then((value: any) => {
            res.status(200).json(value);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.get('/:id/batches', (req: Request, res: any) => {
    _BatchStudent.findAll({
        where: {
            studentId: req.params.id
        }
    })
        .then((batches_students: any[]) => {
            let batchIdArray: number[] = [];
            for (let batchStudentObject of batches_students) {
                batchIdArray.push(batchStudentObject.batchId);
            }
            _Batch.findAll({
                attributes: ['id', 'batchName'],
                where: {
                    id: { $in: batchIdArray }
                },
                order: [
                    ['id', 'ASC']
                ]
            })
                .then((batches: Batch[]) => {
                    res.status(200).json(batches);
                })
                .catch((err: any) => {
                    res.status(500).json(err);
                })
        })
})

route.post('/:id/batches', (req: Request, res: any) => {
    _BatchStudent.create({
        batchId: req.body.batchId,
        studentId: req.params.id
    })
        .then((batchStudent: any) => {
            res.status(200).json(batchStudent)
        })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})

export default route;