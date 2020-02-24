/**
 * BUGGY CASE.
 */
import RcTest from '../src/main';
import ReactDOM from 'react-dom';
import React from 'react';
import './assets/style.scss';

class A extends React.Component {
  prop1 = 1234;
  get abc() {
    return this.prop1;
  }

  constructor(props) {
    super(props);
    this.aaa = this.abc;
  }
}

class App extends A {
  prop1 = 23;
  say() {
    console.log(this.prop1);
  }

  componentDidMount() {
    console.log(this.aaa); // 1234
  }

  render() {
    return (
      <div className="app-container">
        <RcTest />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
