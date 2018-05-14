import { _Batch } from '../../connection';
import { Request, Router } from 'express';

const route: Router = Router();

export class Batch {
    public id: number;
    public batchName: string;
    constructor(id: number, batchName: string) {
        this.id = id;
        this.batchName = batchName;
    }
}

route.get('/', (req: Request, res: any) => {
    _Batch.findAll()
        .then((batches: Batch[]) => {
            res.status(200).json(batches);
        })
        .catch((err: any) => {
            res.status(500).send(err);
        })
})

route.get('/:id', (req: Request, res: any) => {
    _Batch.find({
        where: {
            id: req.params.id
        }
    })
        .then((batch: any) => {
            res.status(200).json(batch);
        })
        .catch((err: any) => {
            res.status(500).json(err);
        })
})

route.post('/', (req: Request, res: any) => {
    _Batch.create({
        batchName: req.body.batchName
    })
        .then((batch: Batch) => {
            res.status(200).json(batch)
        })
        .catch((err: any) => {
            res.status(500).json(err)
        })
})

export default route;