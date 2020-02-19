import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from '@feizheng/noop';
import objectAssign from 'object-assign';
import ReactAntConfirm from '@feizheng/react-ant-confirm';

import { Table, Icon, Button } from 'antd';

const CLASS_NAME = 'react-ant-abstract-curd';

export default class ReactAntAbstractCurd extends Component {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static propTypes = {
    /**
     * The extended className for component.
     */
    className: PropTypes.string,
    /**
     * The router route service.
     */
    routeService: PropTypes.any,
    /**
     * The api service.
     */
    apiService: PropTypes.any
  };

  static defaultProps = {};

  resource = 'users';
  rowKey = 'id';
  size = 'small';
  bordered = true;
  pageSize = 10;
  pagination = {
    // current page number
    page: 'page',
    // per page size
    size: 'size',
    // total count
    total: 'total'
  };

  get fields() {
    console.log('parent fields');
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
        <Button size={'small'} onClick={this.add} icon={'plus'} {...props}>
          新增
        </Button>
      </div>
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
      [size]: this.pageSize,
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
    routeService.push(`/modules/${this.resource}/add`);
  };

  edit = (inItem) => {
    const { routeService } = this.props;
    routeService.push(`/modules/${this.resource}/edit/${this.currentId}`);
  };

  del = (inItem) => {
    const { apiService } = this.props;
    apiService[`${this.resource}_destroy`](this.currentRow).then(() => {
      this.refresh();
    });
  };

  refresh() {
    this.load({ page: this.current, size: this.pageSize });
  }

  load(inData) {
    const { size } = this.pagination;
    const data = nx.mix({ [size]: this.pageSize }, inData);
    this.setState({ loading: true });
    this.apiService[`${this.resource}_index`](data).then((response) => {
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

  tableView() {
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
        pagination={{
          showSizeChanger: true,
          total: total,
          current: this.state[page]
        }}
      />
    );
  }

  render() {
    throw new Error('Render method must be implement!');
  }
}
