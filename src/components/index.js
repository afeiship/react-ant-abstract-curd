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

  get fields() {
    return [];
  }

  get actions() {
    return {
      title: '操作',
      width: 80,
      render: (record) => {
        return (
          <div className={'mr5_ mr__ is-actions'}>
            <a href={'javascript:;'} onClick={this.edit}>
              编辑
            </a>
            <FsmConfirm onClick={this.del}>删除</FsmConfirm>
          </div>
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

  set pageSize(inValue) {
    nx.$local = {
      [`${this.resource}.page`]: inValue
    };
  }

  get pageSize() {
    return nx.get(nx.$local, `${this.resource}.page`, 10);
  }

  constructor(inProps) {
    super(inProps);
    this.state = {
      columns: this.columns,
      data: [],
      page: 1,
      total: 0
    };
  }

  componentDidMount() {
    this.load(this.request);
    this.setCurrentResource();
    this.attachRefresh();
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
    const { apiService } = this.props;
    apiService[`${this.resource}_index`](inData).then((response) => {
      const { rows, total } = response;
      this.setState({ data: rows, total });
    });
  }

  onTableChange = (inPagination) => {
    const { current, pageSize } = inPagination;
    this.pageSize = pageSize;
    this.setState({ page: current }, () => {
      this.load({ page: current, size: pageSize });
    });
  };

  tableView() {
    const { columns, data, total } = this.state;
    return (
      <Table
        size={this.size}
        bordered={this.bordered}
        columns={columns}
        dataSource={data}
        onChange={this.handleTableChange}
        rowKey={this.rowKey}
        pagination={{
          showSizeChanger: true,
          pageSize: this.pageSize,
          total: total,
          current: this.currentPage
        }}
      />
    );
  }

  render() {
    throw new Error('Render method must be implement!');
  }
}
