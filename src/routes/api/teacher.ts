import { _Teacher, _BatchTeacher, _Batch } from '../../connection';
import { Request, Router } from 'express';

const route: Router = Router();

export class Teacher {
    public id: number;
    public teacherName: string;
    constructor(id: number, teacherName: string) {
        this.id = id;
        this.teacherName = teacherName;
    }
}

route.get('/', (req: Request, res: any) => {
    _Teacher.findAll()
        .then((teachers: Teacher[]) => {
            res.status(200).json(teachers);
        })
        .catch((err: any) => {
            res.status(500).send(err);
        })
})

route.get('/:id', (req: Request, res: any) => {
    _Teacher.find({
        where: {
            id: req.params.id
        }
    })
        .then((teacher: any) => {
            res.status(200).json(teacher);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.post('/', (req: Request, res: any) => {
    _Teacher.create({
        teacherName: req.body.teacherName
    })
        .then((teacher: Teacher) => {
            res.status(200).json(teacher)
        })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})


route.delete('/:id', (req: Request, res: any) => {
    _Teacher.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(200).json({
                "success": "deleted the teacher from list"
            });
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.put('/:id', (req: Request, res: any) => {
    _Teacher.update({
        teacherName: req.body.teacherName
    }, {
            where: {
                id: req.params.id
            }
        })
        .then((teacher: any) => {
            res.status(200).json(teacher);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})


route.get('/:id/batches', (req: Request, res: any) => {
    _BatchTeacher.findAll({
        where: {
            teacherId: req.params.id
        }
    })
        .then((batches_teachers: any[]) => {
            let batchIdArray: number[] = [];
            for (let batchStudentObject of batches_teachers) {
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
                .then((batches: any) => {
                    res.status(200).json(batches);
                })
                .catch((err: any) => {
                    res.status(500).json(err);
                })
        })
})

route.post('/:id/batches', (req: Request, res: any) => {
    _BatchTeacher.create({
        batchId: req.body.batchId,
        studentId: req.params.id
    })
        .then((batchTeacher: any) => {
            res.status(200).json(batchTeacher)
        })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})

export default route;