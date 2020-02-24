import ReactAntAbstractCurd from '../src/main';
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
      nx.antColumn('ProjectName', 'full_name'),
      nx.antColumn('IsPivate', 'private', (text) => String(text)),
      nx.antColumn('Owner', 'owner.login')
    ];
  }

  setResponse(res) {
    return {
      rows: res,
      total: 1000
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
    return <Index />;
  }
}
