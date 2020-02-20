import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@feizheng/noop';
import objectAssign from 'object-assign';
import ReactAntConfirm from '@feizheng/react-ant-confirm';

import { Card, Table, Icon, Button } from 'antd';

const CLASS_NAME = 'react-ant-abstract-curd';

export default class ReactAntAbstractCurd extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string
  };

  static defaultProps = {};

  resources = 'users';
  rowKey = 'id';
  size = 'small';
  bordered = true;
  pageSize = 10;
  current = {};
  pagination = {
    // current page number
    page: 'page',
    // per page size
    size: 'size',
    // total count
    total: 'total'
  };

  get id() {
    return nx.get(this.current, `item.${this.rowKey}`);
  }

  get fields() {
    return [];
  }

  get actions() {
    return {
      title: '操作',
      width: 80,
      render: () => {
        return (
          <span className={'mr5_ mr__ is-actions'}>
            <a onClick={this.edit}>编辑</a>
            <ReactAntConfirm onClick={this.del}>删除</ReactAntConfirm>
          </span>
        );
      }
    };
  }

  get columns() {
    return this.actions ? this.fields.concat(this.actions) : this.fields;
  }

  get extraView() {
    return (
      <div className="is-extra">
        <Button size={'small'} onClick={this.add} icon={'plus'}>
          新增
        </Button>
      </div>
    );
  }

  get tableView() {
    const { columns, data, total, loading } = this.state;
    const { page } = this.pagination;
    return (
      <Table
        loading={loading}
        size={this.size}
        bordered={this.bordered}
        columns={columns}
        dataSource={data}
        onChange={this.handleTableChange}
        rowKey={this.rowKey}
        onRow={(record, index) => {
          return {
            onMouseEnter: () => {
              this.current = { index, item: record };
            }
          };
        }}
        pagination={{
          showSizeChanger: true,
          total: total,
          current: this.state[page]
        }}
      />
    );
  }

  constructor(inProps) {
    super(inProps);
    this.setPagination();
    this.serviceInject();
    const { page, size, total } = this.pagination;
    this.state = {
      loading: false,
      columns: this.columns,
      data: [],
      [page]: 1,
      [total]: 0
    };
  }

  /**
   * @template
   * Set pagination mapping.
   */
  setPagination() {}

  /**
   * @template
   * Set wrap response.
   */
  setResponse(inResponse) {
    return inResponse;
  }

  /**
   * @template
   * Service inject.
   */
  serviceInject() {
    this.apiService = null;
    this.routeService = null;
  }

  componentDidMount() {
    const { page } = this.pagination;
    this.load({ [page]: this.state[page] });
  }

  add = () => {
    this.routeService.push(`/modules/${this.resources}/add`);
  };

  edit = () => {
    this.routeService.push(`/modules/${this.resources}/edit?id=${this.id}`);
  };

  del = () => {
    this.apiService[`${this.resources}_destroy`](this.current.item).then(() => {
      this.refresh();
    });
  };

  refresh() {
    const { page, size } = this.pagination;
    this.load({ [page]: this.state[page], [size]: this.pageSize });
  }

  load(inData) {
    const { size } = this.pagination;
    const data = nx.mix({ [size]: this.pageSize }, inData);
    this.setState({ loading: true });
    this.apiService[`${this.resources}_index`](data).then((response) => {
      const { rows, total } = this.setResponse(response);
      this.setState({ data: rows, total, loading: false });
    });
  }

  handleTableChange = (inPagination) => {
    const { current } = inPagination;
    const { page } = this.pagination;
    const target = { [page]: current };

    this.setState(target, () => {
      this.load(target);
    });
  };

  render() {
    throw new Error('Render method must be implement!');
  }
}
