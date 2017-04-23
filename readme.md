# preact-lazy-route

[![npm](https://img.shields.io/npm/v/preact-lazy-route.svg?style=flat)](https://www.npmjs.com/package/preact-lazy-route)
[![travis-ci](https://travis-ci.org/scurker/preact-lazy-route.svg)](https://travis-ci.org/scurker/preact-lazy-route)
[![coveralls](https://coveralls.io/repos/scurker/preact-lazy-route/badge.svg?branch=test-coverage&service=github)](https://coveralls.io/github/scurker/preact-lazy-route?branch=test-coverage) 

`preact-lazy-route` is a component built for [preact-router](https://github.com/developit/preact-router). Using `preact-lazy-route` in combination with a module bundler such as [webpack](https://webpack.github.io/), allows you to implement code splitting on routes with the option do server side rendering in your preact application.

## Install

```bash
$ npm install --save preact-lazy-route
```

## Usage

```js
import { h, render } from 'preact';
import Router from 'preact-router';
import LazyRoute from 'preact-lazy-route';

const App = () => (
  <Router>
    <LazyRoute path="/" component={() => import('./components/home')} />
    <LazyRoute path="/about" component={() => import('./components/about')} />
    <LazyRoute path="/settings" component={() => import('./components/settings')} />
  </Router>
);

render(<App />, document.body);
```

### Loading Fallback

You can provide a loading component to be displayed while your component is being fetched.

```js
<LazyRoute path="/"
    component={() => import('./components/home')}
    loading={MyLoadingComponent} />
```

### Server Side Rendering

`preact-lazy-route` also allows for you to define a server side rendering path:

```js
import path from 'path';

...

<LazyRoute path="/"
    component={() => import('./components/home')}
    ssrPath={path.resolve(__dirname, './components/home')}
    useSsr={!process.env.BROWSER} />
```

You will need to set `useSsr` to `true` when rendering on the server. You can either use some environment variable in your node process or use webpack's [define plugin](https://webpack.js.org/plugins) to set a variable when bundling in webpack.

#### Node Environment

```bash
$ NODE=true node index.js
```

```js
<LazyRoute path="/" useSsr={process.env.NODE} />
```

#### Webpack

```js
import webpack from 'webpack';

export default {
  entry: {
    app: './src/app.jsx'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true)
    })
  ]
};
```

```js
<LazyRoute path="/" useSsr={!process.env.browser} />
```

## License

[MIT](/license)