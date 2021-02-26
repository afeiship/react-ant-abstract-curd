import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactAntConfirm from '@jswork/react-ant-confirm';
import { Table, Button } from 'antd';

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
  current = {};
  pagination = {
    // current page number
    page: 'page',
    // per page size
    size: 'size',
    // total count
    total: 'total'
  };

  get page() {
    const cache = nx.get(nx.$local, `curd__pagination.${this.resources}.page`);
    return this._page || cache || 1;
  }

  set page(inValue) {
    this._page = inValue;
    nx.$local = { [`curd__pagination.${this.resources}.page`]: inValue };
  }

  get pageSize() {
    const cache = nx.get(
      nx.$local,
      `curd__pagination.${this.resources}.pageSize`
    );
    return this._pageSize || cache || 10;
  }

  set pageSize(inValue) {
    this._pageSize = inValue;
    nx.$local = { [`curd__pagination.${this.resources}.pageSize`]: inValue };
  }

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

  constructor(inProps) {
    super(inProps);
    this.state = {
      loading: false,
      columns: this.columns,
      data: []
    };
  }

  /**
   * @template
   * Set wrap response.
   */
  setResponse(inResponse) {
    return inResponse;
  }

  initCache() {
    const { page, size, total } = this.pagination;
    this.state = Object.assign(this.state, {
      [page]: this.page,
      [size]: this.pageSize,
      [total]: 0
    });
  }

  componentDidMount() {
    const { page } = this.pagination;
    this.attachEvents();
    this.initCache();
    this.load({ [page]: this.state[page] });
  }

  componentWillUnmount() {
    this.detachEvents();
  }

  attachEvents() {
    this.refreshEvent = nx.$app.on(`${this.resources}.index.refresh`, () => {
      this.refresh();
    });
  }

  detachEvents() {
    this.refreshEvent && this.refreshEvent.destroy();
  }

  add = () => {
    this.routeService.push(`/modules/${this.resources}/add`);
  };

  edit = () => {
    this.routeService.push(`/modules/${this.resources}/edit/${this.id}`);
  };

  del = () => {
    this.apiService[`${this.resources}_destroy`](this.current.item).then(() => {
      this.refresh();
    });
  };

  refresh() {
    const { page, size } = this.pagination;
    this.load({
      [page]: this.state[page],
      [size]: this.pageSize
    });
  }

  load(inData, inAction) {
    const action = inAction || 'index';
    const { size } = this.pagination;
    const data = nx.mix({ [size]: this.pageSize }, inData);
    this.setState({ loading: true });
    this.apiService[`${this.resources}_${action}`](data).then((response) => {
      const { rows, total } = this.setResponse(response);
      this.setState({ data: rows, total, loading: false });
    });
  }

  table(inProps) {
    const props = inProps || {};
    const { columns, data, total, loading } = this.state;
    const { page, size } = this.pagination;
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
          pageSize: this.state[size],
          current: this.state[page]
        }}
        {...props}
      />
    );
  }

  handleTableChange = (inPagination) => {
    const { current, pageSize } = inPagination;
    const { page, size } = this.pagination;
    const target = { [page]: current, [size]: pageSize };

    // cache page/size to local
    this.page = current;
    this.pageSize = pageSize;
    this.setState(target, () => {
      this.load(target);
    });
  };

  render() {
    throw new Error('Render method must be implement!');
  }
}
