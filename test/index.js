import { h, render } from 'preact';
import path from 'path';
import LazyRoute from '../src/index';
import assert from 'assert';
import './setup';
import SomeComponent from './fixtures/some-component';

const LazyComponent = () => <div class="lazy">Hello Lazy World</div>;
const LoadingComponent = () => <div class="loading">Loading</div>;
const importLazyComponent = () => new Promise(resolve => {
  setTimeout(resolve({ default: LazyComponent }), 1);
});
const Nothing = () => null;

describe('preact-lazy-route', () => {

  let $ = selector => global.document.querySelectorAll(selector);

  afterEach(() => {
    render(<Nothing />, document.body, document.body.firstElementChild);
  });

  it('should export a function', () => {
    assert.equal(typeof LazyRoute, 'function');
  });

  it('should render nothing initially when no fallback is provided', () => {
    render(<LazyRoute component={importLazyComponent} />, document.body);
    assert.equal(global.document.body.innerHTML.length, 0);
  });

  it('should render loading component initially when lazy component has not yet loaded', () => {
    render(<LazyRoute component={importLazyComponent} loading={LoadingComponent} />, document.body);
    assert.equal($('.loading').length, 1);
  });

  it('should render server-side when useSsr is set', () => {
    render(<LazyRoute component={importLazyComponent} useSsr={true} ssrPath={path.join(__dirname, './fixtures/some-component')} />, document.body);
    assert.equal($('.ssr').length, 1);
  });

  it('should render lazy-loaded component after it is loaded', done => {
    render(<LazyRoute component={importLazyComponent} />, document.body);
    setTimeout(() => {
      assert.equal($('.lazy').length, 1);
      done();
    }, 50);
  });

});