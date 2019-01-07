import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Component, MouseEvent} from 'react';
import {instanceContainsNode, unsafe_portalsWithin, unsafe_childNodesWithin, unsafe_getFiberFromNode} from "../src";

export interface AppState {

}

const Click = React.createContext({} as any);

class Portal extends React.Component {
  el = document.createElement('div');

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <Click.Consumer>
        {events => (
          <div>
            {this.props.children}
          </div>
        )}
      </Click.Consumer>,
      this.el
    )
  }
}

class App1 extends Component <{}, AppState> {
  state: AppState = {}

  componentDidMount() {
    console.log('portals', unsafe_portalsWithin(this));
    console.log('nodes', unsafe_childNodesWithin(this));
  }

  render() {
    return (
      <React.Fragment>
        <div>
          1
          <Portal>portal1-1</Portal>
          2
        </div>
        <Portal>portal1-2</Portal>
        3
        <Portal>portal1-3
          <Portal>portal1-4</Portal>
        </Portal>
      </React.Fragment>
    )
  }
}

class App2 extends Component <{}, AppState> {
  state: AppState = {}

  componentDidMount() {
    console.log(unsafe_portalsWithin(this));
  }

  render() {
    return (
      <React.Fragment>
        <Portal>portal2-1</Portal>
        <Portal>portal2-2</Portal>
        <Portal>portal2-3
          <Portal>portal2-4</Portal>
        </Portal>
      </React.Fragment>
    )
  }
}

export class App extends React.Component {
  clickCapture = (event: MouseEvent<HTMLDivElement>) => {
    console.group('click down');
    console.log(event.currentTarget, event.target);
    console.log('is within', instanceContainsNode(this, event.currentTarget), instanceContainsNode(this, event.target as any));
    console.groupEnd()
  };

  click = (event: MouseEvent<HTMLDivElement>) => {
    console.group('click up');
    console.log(event.currentTarget, event.target);
    console.log('is within', instanceContainsNode(this, event.currentTarget), instanceContainsNode(this, event.target as any));
    console.groupEnd();

    console.log(unsafe_getFiberFromNode(event.target as any));
  };

  render() {
    return (
      <Click.Provider value={{onClick: this.click, onClickCapture: this.clickCapture}}>
        <div onClickCapture={this.clickCapture} onClick={this.click}>
          <button>test</button>
          <div>
            <App1/>
          </div>
          <div>
            <App2/>
          </div>
          <button>test</button>
        </div>
      </Click.Provider>
    )
  }
}