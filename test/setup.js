import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!doctype html><html><body></body></html>');

global.document = window.document;
global.window = window;