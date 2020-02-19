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
  import {
    ReduxAppBase,
    ReduxBoot,
    reduxRender
  } from '@feizheng/next-react-redux';

  import '@feizheng/next-param';
  import '@feizheng/next-ant-column';
  import './assets/style.scss';

  class ApiService {
    static repos_index(inData) {
      var url = nx.param(inData, '/api/users/afeiship/repos');
      return fetch(url).then((res) => res.json());
    }
  }

  class RouteService {
    static push(inUrl) {
      console.log('push to:', inUrl);
    }
  }

  class Index extends ReactAntAbstractCurd {
    resource = 'repos';

    get fields() {
      return [
        nx.antColumn('ID', 'id'),
        nx.antColumn('ProjectName', 'full_name'),
        nx.antColumn('IsPivate', 'private', (text) => String(text)),
        nx.antColumn('Owner', 'owner.login')
      ];
    }

    setPagination() {
      this.pagination = {
        page: 'page',
        size: 'per_page',
        total: 'total'
      };
    }

    setResponse(res) {
      return {
        rows: res,
        total: 1000
      };
    }

    serviceInject() {
      this.routeService = RouteService;
      this.apiService = ApiService;
    }

    render() {
      return <div className="app-container">{this.tableView()}</div>;
    }
  }

  @reduxRender('app', { prefix: 'react-spa', loadable: false })
  export default class extends ReduxAppBase {
    static initialState(inStore) {
      return {
        memory: {
          modalUser: false,
          modalUserQuery: false
        }
      };
    }

    render() {
      return <Index />;
    }
  }

  ```

## documentation
- https://afeiship.github.io/react-ant-abstract-curd/
