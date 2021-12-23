import React, { Component } from 'react';
import ReactAntConfirm from '@jswork/react-ant-confirm';
import { Table, Button, Card, message } from 'antd';
import ReactEmptyState from '@jswork/react-empty-state';
import ReactAdminIcons from '@jswork/react-admin-icons';
import nx from '@jswork/next';
import nxHashlize from '@jswork/next-hashlize';
import NxUrlOperator from '@jswork/next-url-operator';
import deepEqual from 'deep-equal';

const CLASS_NAME = 'react-ant-abstract-curd';

export type ReactAntAbstractCurdProps = {
  /**
   * The extended className for component.
   */
  className?: string;
};

export default class ReactAntAbstractCurd extends Component<ReactAntAbstractCurdProps, any> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';

  static defaultProps = {};
  protected apiService;
  protected routeService;
  protected eventService;
  private lastQs;
  private refreshEvent;
  private urlOperator = new NxUrlOperator({ type: 'hash' });

  resources = 'users';
  rowKey = 'id';
  size = 'small';
  bordered = true;
  current = { item: null, index: -1 };
  module = 'modules';
  action = 'index';
  pagination = {
    // current page number
    page: 'page',
    // per page size
    size: 'size',
    // total count
    total: 'total'
  };

  get options() {
    return {};
  }

  get page() {
    const { page } = this.qs;
    return page || 1;
  }

  set page(inValue) {
    location.href = this.urlOperator.update({ page: inValue });
  }

  get pageSize() {
    const { size } = this.qs;
    return size || 10;
  }

  set pageSize(inValue) {
    location.href = this.urlOperator.update({ size: inValue });
  }

  get id() {
    return nx.get(this.current, `item.${this.rowKey}`);
  }

  get fields(): any[] {
    return [];
  }

  get actions() {
    return {
      title: '操作',
      width: 90,
      render: () => {
        return (
          <span className={'mr-5_ mr_ is-actions'}>
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
      <div className="mr-5_ is-extra">
        <Button size={'small'} onClick={this.forceRefresh} className="mr-5_ mr_">
          <ReactAdminIcons value="refresh" size={14} />
          <span>刷新</span>
        </Button>
        <Button size={'small'} onClick={this.add} className="mr-5_ mr_">
          <ReactAdminIcons value="addition" size={14} />
          <span>新增</span>
        </Button>
      </div>
    );
  }

  get params() {
    return nx.get(this.props, 'match.params');
  }

  get qs() {
    const pathname = location.hash.slice(1);
    if (!pathname) return {};
    const [_, search] = pathname.split('?');
    return nxHashlize(search);
  }

  constructor(inProps) {
    super(inProps);
    const { total } = this.pagination;
    this.lastQs = this.qs;
    this.state = nx.mix(null, this.initialState(), {
      loading: false,
      columns: this.columns,
      data: [],
      [total]: 0
    });
    this.init();
  }

  /**
   * @template
   *
   */
  initialState() {
    return null;
  }

  /**
   * @template
   * Set wrap response.
   */
  setResponse(inResponse) {
    return inResponse;
  }

  /**
   * @template
   * Set init after constructor.
   */
  init() {}

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
    setTimeout(() => {
      nx.set(this.routeService, 'current', this.props);
    }, 0);
  }

  shouldComponentUpdate() {
    if (!deepEqual(this.qs, this.lastQs)) {
      this.lastQs = this.qs;
      this.refresh();
    }
    return true;
  }

  componentWillUnmount() {
    this.detachEvents();
  }

  attachEvents() {
    this.refreshEvent = this.eventService.on(`${this.resources}.${this.action}.refresh`, () => {
      this.refresh();
    });
  }

  detachEvents() {
    this.refreshEvent && this.refreshEvent.destroy();
  }

  route = (inModule, inAction) => {
    const url = `/${this.module}/${this.resources}/${inModule}`;
    const action = inAction ? 'replace' : 'push';
    this.routeService[action](url);
  };

  add = () => {
    this.routeService.push(`/${this.module}/${this.resources}/add`);
  };

  edit = () => {
    this.routeService.push(`/${this.module}/${this.resources}/edit/${this.id}`);
  };

  del = () => {
    const data = nx.mix(null, this.current.item, this.options);
    this.apiService[`${this.resources}_destroy`](data).then(() => this.refresh());
  };

  /**
   * Sub class will call this method.
   * @param inItem
   */
  update = (inItem) => {
    const data = { id: this.id, ...inItem };
    this.apiService[`${this.resources}_update`](data).then(() => message.success('操作成功'));
  };

  refresh = () => {
    const { page, size } = this.pagination;
    this.load({
      [page]: this.state[page],
      [size]: this.pageSize
    });
  };

  forceRefresh = () => {
    this.handleTableChange({ current: 1, pageSize: this.pageSize });
  };

  load(inData, inAction?) {
    const action = inAction || this.action || 'index';
    const { size } = this.pagination;
    const data = nx.mix({ [size]: this.pageSize }, inData, this.options);
    this.setState({ loading: true });
    this.apiService[`${this.resources}_${action}`](data).then((response) => {
      const { rows, total } = this.setResponse(response);
      this.setState({ data: rows, total, loading: false });
    });
  }

  table(inProps?) {
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
        onRow={(record, index: number) => {
          return {
            onMouseEnter: () => {
              this.current = { index, item: record };
            }
          };
        }}
        pagination={{
          showSizeChanger: true,
          total: total,
          pageSize: parseInt(this.state[size]),
          current: parseInt(this.state[page])
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

  empty() {
    return <ReactEmptyState centered title="暂无数据" />;
  }

  view() {
    const { data } = this.state;
    return <Card title="列表">{data.length ? this.table() : this.empty()}</Card>;
  }

  render(): React.ReactNode {
    // throw new Error('Render method must be implement!');
    return null;
  }
}
