# react-ant-abstract-curd
> Antd abstract curd.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-ant-abstract-curd
```

## properties
| Name      | Type   | Required | Default | Description                           |
| --------- | ------ | -------- | ------- | ------------------------------------- |
| className | string | false    | -       | The extended className for component. |


## usage
1. import css
  ```scss
  @import "~@jswork/react-ant-abstract-curd/dist/style.css";

  // or use sass
  @import "~@jswork/react-ant-abstract-curd/dist/style.scss";
  @import "~@jswork/react-empty-state/dist/style.scss";

  // customize your styles:
  $react-ant-abstract-curd-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import { Card } from 'antd';
  import ReactDemokit from '@jswork/react-demokit';
  import { ReduxAppBase, reduxRender } from '@jswork/next-react-redux';
  import ReactAdminIcons from '@jswork/react-admin-icons';
  import ReactAntAbstractCurd from '@jswork/react-ant-abstract-curd';
  import './assets/style.scss';

  import '@jswork/next-param';
  import '@jswork/next-ant-column';

  class ApiService {
    static repos_index(inData) {
      var url = nx.param(inData, 'https://jsonplaceholder.typicode.com/posts');
      return fetch(url).then((res) => res.json());
    }

    static repos_destroy(inData) {
      return new Promise((resolve) => {
        console.log('call destroy api', inData);
        resolve();
      });
    }
  }

  class RouteService {
    static push(inUrl) {
      console.log('push to:', inUrl);
    }
  }

  class Index extends ReactAntAbstractCurd {
    apiService = ApiService;
    routeService = RouteService;
    resources = 'repos';
    pagination = {
      page: 'page',
      size: 'per_page',
      total: 'total'
    };

    get fields() {
      return [
        nx.antColumn('ID', 'id'),
        nx.antColumn('title', 'title'),
        nx.antColumn('body', 'body', (text) => String(text)),
        nx.antColumn('uid', 'userId')
      ];
    }

    setResponse(res) {
      return {
        rows: res,
        total: 100
      };
    }

    get titleView() {
      return (
        <span className="mr-5_ mr_">
          <ReactAdminIcons value="date" />
          <span>列表管理</span>
        </span>
      );
    }

    render() {
      return (
        <Card title={this.titleView} className="m10" extra={this.extraView}>
          {this.table()}
        </Card>
      );
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
      return (
        <ReactDemokit
          className="p-3 app-container"
          url="https://github.com/afeiship/react-ant-abstract-curd">
          <Index />
        </ReactDemokit>
      );
    }
  }

  ```

## documentation
- https://afeiship.github.io/react-ant-abstract-curd/


## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-abstract-curd/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-ant-abstract-curd
[version-url]: https://npmjs.org/package/@jswork/react-ant-abstract-curd

[license-image]: https://img.shields.io/npm/l/@jswork/react-ant-abstract-curd
[license-url]: https://github.com/afeiship/react-ant-abstract-curd/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-ant-abstract-curd
[size-url]: https://github.com/afeiship/react-ant-abstract-curd/blob/master/dist/react-ant-abstract-curd.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-ant-abstract-curd
[download-url]: https://www.npmjs.com/package/@jswork/react-ant-abstract-curd
