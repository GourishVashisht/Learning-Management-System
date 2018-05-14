import { _Subject, _Teacher } from '../../connection';
import { Request, Router } from 'express';
import { Student } from './student';

const route: Router = Router()

export class Subject {
    public id: number;
    public subjectName: string;
    constructor(id: number, subjectName: string) {
        this.id = id;
        this.subjectName = subjectName;

    }
}

route.get('/', (req: Request, res: any) => {
    _Subject.findAll()
        .then((subjects: Subject[]) => {
            res.status(200).json(subjects);
        })
        .catch((err: any) => {
            res.status(500).send(err);
        })
})

route.get('/:id', (req: Request, res: any) => {
    _Subject.find({
        where: {
            id: req.params.id
        }
    })
        .then((subject: any) => {
            res.status(200).json(subject);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.post('/', (req: Request, res: any) => {
    _Subject.create({
        subjectName: req.body.subjectName
    })
        .then((subject: Subject) => {
            res.status(200).json(subject)
        })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})


route.delete('/:id', (req: Request, res: any) => {
    _Subject.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => {
            res.status(200).json({
                "success": "deleted the subject from list"
            });
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.put('/:id', (req: Request, res: any) => {
    _Subject.update({
        subjectName: req.body.studentName
    }, {
            where: {
                id: req.params.id
            }
        })
        .then((subject: any) => {
            res.status(200).json(subject);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})


route.get('/:id/teachers', (req: Request, res: any) => {
    _Teacher.findAll({
        where: {
            subjectId: req.params.id
        }
    })
        .then((teachers: any) => {
            res.status(200).json(teachers);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.post('/:id/teachers', (req: Request, res: any) => {
    _Teacher.create({
        techerName: req.body.teacherName,
        subjectId: req.params.id
    })
        .then((teacher: any) => {
            res.status(200).json(teacher);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

export default route;