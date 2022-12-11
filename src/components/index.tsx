import React, { Component } from 'react';
import ReactAntConfirm from '@jswork/react-ant-confirm';
import { Table, Button, message, Space, Tag, Card } from 'antd';
import { PlusOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import ReactEmptyState from '@jswork/react-empty-state';
import ReactAntInputSearch from '@jswork/react-ant-input-search';
import deepEqual from 'deep-equal';
import debounce from 'debounce';

// next packages
import '@jswork/next';
import '@jswork/next-qs';
import '@jswork/next-get2get';
import '@jswork/next-url-operator';

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
  private urlOperator = new nx.UrlOperator({ type: 'hash' });

  resources = 'users';
  rowKey = 'id';
  size = 'small';
  bordered = true;
  current = { item: null, index: -1 };
  module = 'modules';
  action = 'index';
  searchable = false;
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

  get keywords() {
    const { keywords } = this.qs;
    return keywords || '';
  }

  set keywords(inValue) {
    const target = { keywords: inValue };
    location.href = this.urlOperator.update(target);
    this.setState(target);
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
          <Space>
            <a onClick={this.edit}>编辑</a>
            <ReactAntConfirm onClick={this.del}>删除</ReactAntConfirm>
          </Space>
        );
      }
    };
  }

  get columns() {
    return this.actions ? this.fields.concat(this.actions) : this.fields;
  }

  get titleView() {
    return (
      <Space>
        <UnorderedListOutlined />
        <span>列表管理</span>
        <Tag>{this.resources}</Tag>
      </Space>
    );
  }

  get extraView() {
    return (
      <Space>
        {this.searchable && (
          <ReactAntInputSearch
            placeholder={`按title搜索${this.resources}`}
            allowClear
            autoFocus
            size='small'
            value={this.state.keywords}
            enterButton
            onChange={(e) => this.setState({ keywords: e.target.value })}
            onSearch={this.handleQuery}
          />
        )}
        <Button size={'small'} onClick={this.forceRefresh}>
          <ReloadOutlined />
          <span>刷新</span>
        </Button>
        <Button size={'small'} onClick={this.add}>
          <PlusOutlined />
          <span>新增</span>
        </Button>
      </Space>
    );
  }

  get params() {
    return nx.get2get(this.props, ['match.params', 'params']);
  }

  get qs() {
    const pathname = location.hash.slice(1);
    if (!pathname) return {};
    const [_, search] = pathname.split('?');
    return nx.qs(search);
  }

  constructor(inProps) {
    super(inProps);
    const { total } = this.pagination;
    this.lastQs = this.qs;
    this.state = nx.mix(null, this.initialState(), {
      loading: false,
      columns: this.columns,
      keywords: this.keywords,
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
  transformResponse(inResponse) {
    return inResponse;
  }

  /**
   * @template
   * Set init after constructor.
   */
  init() {
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
   * SubClass will call this method.
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
    this.keywords = '';
    this.handleTableChange({ current: 1, pageSize: this.pageSize });
  };

  // todo: 一些地方有不合理的调用，先用此方法，后续建议优化
  load = debounce((inData, inAction?) => {
    const action = inAction || this.action || 'index';
    const { size } = this.pagination;
    const data = nx.mix({ [size]: this.pageSize }, inData, this.options);
    this.setState({ loading: true });
    this.apiService[`${this.resources}_${action}`](data).then((response) => {
      const { rows, total } = this.transformResponse(response);
      this.setState({ data: rows, total, loading: false });
    });
  });

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

  handleQuery = (inEvent) => {
    const { value } = inEvent.target;
    this.keywords = value;
    this.handleTableChange({ current: 1, pageSize: this.pageSize });
  };

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
    return <ReactEmptyState centered title='暂无数据' />;
  }

  render() {
    return (
      <Card
        title={this.titleView}
        extra={this.extraView}
        className={CLASS_NAME}>
        {this.table()}
      </Card>
    );
  }
}
