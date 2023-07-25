import React, { Component, ReactNode } from 'react';
import ReactAntConfirm from '@jswork/react-ant-confirm';
import { Button, message, Space, Tag, Card } from 'antd';
import { PlusOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';

// next packages
import '@jswork/next';
import '@jswork/next-qs';
import '@jswork/next-get2get';
import '@jswork/next-url-operator';
import '@jswork/next-kebab-case';

const CLASS_NAME = 'react-ant-abstract';

type RecordType = any | null;

export type ReactAntAbstractProps = {
  /**
   * The extended className for component.
   */
  className?: string;
};

export default class ReactAntAbstract extends Component<ReactAntAbstractProps, any> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';

  static defaultProps = {};
  protected apiService;
  protected routeService;
  protected eventService;
  protected refreshEvent;

  resources = 'users';
  size = 'small';
  module = 'modules';
  action = 'index';
  rowKey = 'id';
  current = { item: null, index: -1 };

  get actions() {
    return {
      title: '操作',
      width: 90,
      render: (text: ReactNode, record: RecordType) => {
        return (
          <Space>
            <a onClick={this.edit}>编辑</a>
            <ReactAntConfirm onClick={this.del}>删除</ReactAntConfirm>
          </Space>
        );
      }
    };
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

  get id() {
    return nx.get(this.current, `item.${this.rowKey}`);
  }

  get options(): any {
    return null;
  }

  constructor(inProps) {
    super(inProps);
    this.state = nx.mix(null, this.initialState(), {
      loading: false,
      data: []
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
  dataDidLoad(inResponse) {
    return inResponse;
  }

  /**
   * @template
   * Set init after constructor.
   */
  init() {}

  /**
   * @template
   *  Set refresh method.
   */
  forceRefresh = () => {
    // 与 refresh 不同之处在于，重置并 refresh
    this.load();
  };

  /**
   * @template
   * Set refresh method.
   */
  refresh = () => {
    this.load();
  };

  load = () => {};

  componentDidMount() {
    this.attachEvents();
    setTimeout(() => {
      nx.set(this.routeService, 'current', this.props);
    }, 0);
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

  routerPrefix() {
    const module = nx.kebabCase(this.module);
    const resources = nx.kebabCase(this.resources);
    return `${module}/${resources}`;
  }

  route = (inModule, inAction?: boolean) => {
    const prefix = this.routerPrefix();
    const url = `/${prefix}/${inModule}`;
    const action = inAction ? 'replace' : 'push';
    this.routeService[action](url);
  };

  add = () => {
    this.route('add');
  };

  edit = (inEvent) => {
    inEvent.stopPropagation();
    if (this.id) this.route(`edit/${this.id}`);
  };

  del = (inEvent) => {
    inEvent.stopPropagation();
    const data = nx.mix(null, this.current.item);
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

  view(inProps?): ReactNode {
    console.warn('Must implement: ', inProps);
    return null;
  }

  render() {
    const { loading } = this.state;
    return (
      <Card loading={loading} title={this.titleView} extra={this.extraView} className={CLASS_NAME}>
        {this.view()}
      </Card>
    );
  }
}
