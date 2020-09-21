import polka from 'polka';
import * as chokidar from 'chokidar';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { startService } from 'esbuild';
import { createReadStream } from 'fs';
import send from '@polka/send-type';

const jsx = `
  import * as React from 'react';
  import * as ReactDOM from 'react-dom';
  import App from './App';
  
  const GatsbyImage = require('../dist/gatsby-image.browser');

  ReactDOM.hydrate(
    <App GatsbyImage={GatsbyImage} />,
    document.getElementById('root')
  );
`;
let buildService;
let clientBundle = {
  err: null,
  content: null,
};
async function buildClientBundle() {
  if (!buildService) {
    buildService = await startService();
  }

  try {
    const result = await buildService.build({
      bundle: true,
      minify: false,
      write: false,
      platform: 'browser',
      jsxFactory: 'React.createElement',
      loader: {
        '.js': 'jsx',
      },
      define: {
        'process.env.NODE_ENV': '"development"',
      },
      stdin: {
        contents: jsx,
        loader: 'jsx',
      },
    });

    clientBundle.content = Buffer.from(result.outputFiles[0].contents).toString(
      'utf-8'
    );
  } catch (err) {
    clientBundle.content = null;
    clientBundle.err = err;
  }

  return clientBundle;
}

let timer;
chokidar.watch('../dist/').on('change', () => {
  if (timer) {
    return;
  }

  timer = setTimeout(() => {
    timer = null;
    buildClientBundle();
  }, 100);
});

polka()
  .get('/', (_, res) => {
    const { default: App } = require('./App');
    const GatsbyImage = require('../dist/gatsby-image.js');
    let html = `<!doctype html><html><head></head><body><div id="root">`;
    html += ReactDOMServer.renderToString(<App GatsbyImage={GatsbyImage} />);
    html += `</div><script src="/bundle.js"></script></body></html>`;

    res.end(html);
  })
  .get('/horse-long.jpg', async (_, res) => {
    const file = createReadStream('images/horse-long.jpg');

    setTimeout(() => {
      send(res, 206, file, { 'Content-Type': 'images/jpg' });
    }, 0);
  })
  .get('/bundle.js', async (_, res) => {
    if (!clientBundle.content && !clientBundle.err) {
      await buildClientBundle();
    }

    if (clientBundle.err) {
      res.writeHead(200, {
        'Content-Type': 'application/javascript;charset=UTF-8',
      });

      res.end(
        `(function() { console.log(${JSON.stringify(
          clientBundle.err,
          null,
          2
        )})})()`
      );
      return;
    }

    res.writeHead(200, {
      'Content-Type': 'application/javascript;charset=UTF-8',
    });
    setTimeout(() => {
      res.end(clientBundle.content);
    }, 2000);
  })
  .listen(8000);

process.on('SIGINT', () => {
  buildService && buildService.stop();
  process.exit(0);
});
