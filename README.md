# react-ant-abstract-curd
> Antd abstract curd.

## installation
```shell
npm install -S @feizheng/react-ant-abstract-curd
```

## update
```shell
npm update @feizheng/react-ant-abstract-curd
```

## properties
| Name         | Type   | Default | Description                           |
| ------------ | ------ | ------- | ------------------------------------- |
| className    | string | -       | The extended className for component. |
| routeService | any    | -       | The router route service.             |
| apiService   | any    | -       | The api service.                      |


## usage
1. import css
  ```scss
  @import "~@feizheng/react-ant-abstract-curd/dist/style.scss";

  // customize your styles:
  $react-ant-abstract-curd-options: ()
  ```
2. import js
  ```js
  import ReactAntAbstractCurd from '@feizheng/react-ant-abstract-curd';
  import ReactDOM from 'react-dom';
  import React from 'react';
  import './assets/style.scss';

  class App extends React.Component {
    componentDidMount() {}
    render() {
      return (
        <div className="app-container">
          <ReactAntAbstractCurd />
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));

  ```

## documentation
- https://afeiship.github.io/react-ant-abstract-curd/
