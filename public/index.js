import React from 'react';
import ReactDemokit from '@jswork/react-demokit';
import { ReduxAppBase, reduxRender } from '@jswork/next-react-redux';
import ReactAntAbstractCurd from '../src/main';
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

  render() {
    return <div className="app-container">{this.table()}</div>;
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
