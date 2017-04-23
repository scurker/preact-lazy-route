import { h, Component } from 'preact';

export default class LazyRoute extends Component {

  constructor({ ssrPath, useSsr }) {
    super();
    if(typeof useSsr !== 'undefined') {
      let component = require(ssrPath);
      this.state = { component: component.default || component }
    }
  }

  componentWillMount() {
    let { useSsr, component } = this.props;
    if(typeof useSsr === 'undefined' && component && typeof component === 'function') {
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
    return renderComponent ? h(renderComponent, { ...originalProps }) : null;
  }

}