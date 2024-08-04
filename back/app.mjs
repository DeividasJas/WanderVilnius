import express from 'express';
import cors from 'cors';

import tourRoute from './routes/toursRoute.mjs'
import usersRoute from './routes/usersRoute.mjs'
import guidesRoute from './routes/guidesRoute.mjs'
import registrationRoute from './routes/registrationRoute.mjs'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/wandervilnius/v1/tour', tourRoute);
app.use('/wandervilnius/v1/user', usersRoute);
app.use('/wandervilnius/v1/guide', guidesRoute);
app.use('/wandervilnius/v1/registration', registrationRoute);

export default app;
