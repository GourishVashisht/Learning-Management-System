import { _Lecture } from '../../connection';
import { Request, Router } from 'express';

const route: Router = Router();

export class Lecture {
    public id: number;
    public lectureName: string;
    constructor(id: number, lectureName: string) {
        this.id = id;
        this.lectureName = lectureName;
    }
}

export default route;