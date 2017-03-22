import express from 'express';
import path from 'path';
import proxy from 'express-http-proxy';

const prjRoot = p => path.resolve(__dirname, '../../', p);

const main = async () => {
  const app = express();
  /* app routes */
  app.use('/api', proxy('localhost:5000'));
  app.use('/static', express.static(prjRoot('./devbuild/')));
  app.get('/*', (req, res) => {
    res.sendFile('index.html', { root: prjRoot('./devbuild/') });
  });

  app.listen(4000, () => {
    // eslint-disable-next-line no-console
    console.log('Webpack dev server listening on port 4000...');
  });
};

// eslint-disable-next-line no-console
main().catch(err => console.error(err));
