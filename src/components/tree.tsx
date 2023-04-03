import React from 'react';
import ReactAntConfirm from '@jswork/react-ant-confirm';
import { Tree, Space } from 'antd';
import ReactAntTree from '@jswork/react-ant-tree';
import Abstract from './abstract';

export class ReactAntCurdTree extends Abstract {
  action = 'tree';

  template = ({ item, index }, cb) => {
    const { value, label } = item;
    const update = () => this.current = { index, item };
    const titleView = (
      <Space onMouseEnter={update}>
        <span>{label}</span>
        <a onClick={this.edit}>编辑</a>
        <ReactAntConfirm onClick={this.del}>删除</ReactAntConfirm>
      </Space>
    );

    return (
      <Tree.TreeNode key={value} title={titleView}>
        {cb()}
      </Tree.TreeNode>
    );
  };

  load = () => {
    const action = this.action;
    this.setState({ loading: true });
    this.apiService[`${this.resources}_${action}`]()
      .then((response) => {
        const items = this.transformResponse(response);
        this.setState({ items });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  view() {
    const { items } = this.state;
    return <ReactAntTree showLine selectable={false} directory defaultExpandAll items={items}
                         template={this.template} />;
  }

  componentDidMount() {
    this.attachEvents();
    this.load();
    setTimeout(() => {
      nx.set(this.routeService, 'current', this.props);
    }, 0);
  }
}
