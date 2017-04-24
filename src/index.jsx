import { h, Component } from 'preact';

export default class LazyRoute extends Component {

  constructor({ ssrPath, useSsr }) {
    super();
    if(typeof useSsr !== 'undefined' && useSsr) {
      let component = require(ssrPath);
      this.state = { component: component.default || component }
    }
  }

  componentWillMount() {
    let { useSsr, component } = this.props;

    if(!useSsr && component && typeof component === 'function') {
      let loadComponent = component();
      if(loadComponent && loadComponent.then) {
        loadComponent.then(component => {
          this.setState({ component: component.default });
        });
      }
    }
  }

  render({ loading, ...originalProps }, { component }) {
    let fallback = loading || null
      , renderComponent = component || fallback;

    // Remove internal props for the rendering component
    ['useSsr', 'ssrPath', 'component'].forEach(prop => delete originalProps[prop]);

    return renderComponent ? h(renderComponent, originalProps) : null;
  }

}