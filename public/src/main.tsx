import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Card } from 'antd';
import ReactAdminIcons from '@jswork/react-admin-icons';
import ReactAntAbstractCurd from '../../src/main';
import './style.css';
import EventMitt from '@jswork/event-mitt';
import nx from '@jswork/next';
import '@jswork/next-param';
import '@jswork/next-ant-column';

class ApiService {
  static repos_index(inData) {
    var url = nx.param(inData, 'https://jsonplaceholder.typicode.com/posts');
    return fetch(url).then((res) => res.json());
  }

  static repos_destroy(inData): Promise<any> {
    return new Promise((resolve) => {
      console.log('call destroy api', inData);
      resolve(inData);
    });
  }
}

class RouteService {
  static push(inUrl) {
    console.log('push to:', inUrl);
  }
}

/**
 * apiService: nx.$api
 * eventService: nx.$event
 * routeService: nx.$route
 * engineType: nx.$local | nx.$session
 */

class Index extends ReactAntAbstractCurd {
  apiService = ApiService; // nx.$api
  routeService = RouteService; // nx.$route
  eventService = nx.mix(this, EventMitt); // nx.$app
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
      <span className='mr-5_ mr_'>
        <ReactAdminIcons value='date' />
        <span>列表管理</span>
      </span>
    );
  }

  render() {
    return (
      <Card title={this.titleView} className='m10' extra={this.extraView}>
        {this.table()}
      </Card>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
