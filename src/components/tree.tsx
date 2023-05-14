import React from 'react';
import { Tree, Space, Popconfirm, Badge } from 'antd';
import ReactAntTree from '@jswork/react-ant-tree';
import Abstract from './abstract';

const stop = (e) => e?.stopPropagation();

export class ReactAntCurdTree extends Abstract {
  action = 'tree';
  rowKey = 'value';
  orderKey = 'sequence';

  template = ({ item, index }, cb) => {
    const { value, label } = item;
    const update = () => (this.current = { index, item });
    const order = nx.get(item, this.orderKey);
    const isLeaf = Boolean(!item.children);

    const titleView = (
      <Space onMouseEnter={update}>
        <Badge size="small" count={order}>
          {label}
        </Badge>
        <a onClick={this.edit}>编辑</a>
        <Popconfirm title="确认执行这个操作？" onConfirm={this.del} onCancel={stop}>
          <a onClick={stop}>删除</a>
        </Popconfirm>
      </Space>
    );

    return (
      <Tree.TreeNode key={value} isLeaf={isLeaf} title={titleView}>
        {cb()}
      </Tree.TreeNode>
    );
  };

  load = () => {
    const action = this.action;
    this.setState({ loading: true });
    this.apiService[`${this.resources}_${action}`]()
      .then((response) => {
        const items = this.dataDidLoad(response);
        this.setState({ items });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  view() {
    const { items } = this.state;
    return (
      <ReactAntTree
        showLine
        selectable={false}
        directory
        defaultExpandAll
        items={items}
        template={this.template}
      />
    );
  }

  componentDidMount() {
    this.attachEvents();
    this.load();
    setTimeout(() => {
      nx.set(this.routeService, 'current', this.props);
    }, 0);
  }
}
