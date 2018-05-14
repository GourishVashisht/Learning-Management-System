import { Request, Router } from 'express';

import batchRoute from './batch';
import courseRoute from './course';
import lectureRoute from './lecture';
import studentRoute from './student';
import subjectRoute from './subject';
import techerRoute from './teacher';

const route: Router = Router();

const routes = {
    batchRoute, courseRoute, lectureRoute, studentRoute, subjectRoute, techerRoute
}

route.use('/batches', routes.batchRoute)
route.use('/courses', routes.courseRoute)
route.use('/lectures', routes.lectureRoute)
route.use('/students', routes.studentRoute)
route.use('/subjects', routes.subjectRoute)
route.use('/teachers', routes.techerRoute)

export default route;
