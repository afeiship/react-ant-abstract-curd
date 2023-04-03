import React from 'react';
import ReactAntConfirm from '@jswork/react-ant-confirm';
import { Table, Button, Space, Tag } from 'antd';
import { PlusOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import ReactAntInputSearch from '@jswork/react-ant-input-search';
import deepEqual from 'deep-equal';
import debounce from 'debounce';
import Abstract from './abstract';

// next packages
import '@jswork/next';
import '@jswork/next-qs';
import '@jswork/next-get2get';
import '@jswork/next-url-operator';
import '@jswork/next-kebab-case';

const CLASS_NAME = 'react-ant-abstract-curd';

export class ReactAntCurdTable extends Abstract {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';

  static defaultProps = {};
  private lastQs;
  private urlOperator = new nx.UrlOperator({ type: 'hash' });

  bordered = true;
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

  load = debounce((inData, inAction?) => {
    const action = inAction || this.action || 'index';
    const { size } = this.pagination;
    const data = nx.mix({ [size]: this.pageSize }, inData);
    this.setState({ loading: true });
    this.apiService[`${this.resources}_${action}`](data).then((response) => {
      const { rows, total } = this.transformResponse(response);
      this.setState({ data: rows, total, loading: false });
    });
  });

  view(inProps?) {
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
          const update = () => this.current = { index, item: record };
          return { onClick: update, onMouseEnter: update };
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
}
