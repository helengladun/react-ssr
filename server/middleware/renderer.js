import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Loadable from "react-loadable";

import App from '../../src/App'

const path = require('path');
const fs = require('fs');

export default(req, res, next) => {
    const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('err', err);
            return res.status(404).end();
        }

        const modules = [];

        // render the app as a string
        const html = ReactDOMServer.renderToString(
            <Loadable.Capture report={m => modules.push(m)}>
                <App />
            </Loadable.Capture>
        );

        console.log(modules);

        return res.send(
            htmlData.replace(
                'div id="root"></div>',
                `<div id="root"${html}</div>`
            )
        )
    })
}