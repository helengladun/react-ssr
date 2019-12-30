import express from 'express'

import serverRenderer from './middleware/renderer'

const PORT = 3000;
const path = require('path');

const app = express();
const router = express.Router();

router.use('^/$', serverRenderer);

router.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
));

router.use('*', serverRenderer);

app.use(router);


Loadable.preloadAll().then(() => {
    app.listen(PORT, (error) => {
        console.log(`listening on ${PORT} ...`)
    });
});