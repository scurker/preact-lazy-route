import { jsdom } from 'jsdom';

const dom = jsdom('<!doctype html><html><body></body></html>');

global.document = dom;
global.window = dom.defaultView;