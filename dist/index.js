!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("antd"),require("prop-types"),require("@feizheng/react-ant-confirm"),require("react-dom"),require("classnames"),require("@feizheng/noop"),require("object-assign")):"function"==typeof define&&define.amd?define(["react","antd","prop-types","@feizheng/react-ant-confirm","react-dom","classnames","@feizheng/noop","object-assign"],t):"object"==typeof exports?exports.ReactAntAbstractCurd=t(require("react"),require("antd"),require("prop-types"),require("@feizheng/react-ant-confirm"),require("react-dom"),require("classnames"),require("@feizheng/noop"),require("object-assign")):e.ReactAntAbstractCurd=t(e.react,e.antd,e["prop-types"],e["@feizheng/react-ant-confirm"],e["react-dom"],e.classnames,e["@feizheng/noop"],e["object-assign"])}(window,(function(e,t,n,r,o,i,a,c){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t){e.exports=o},function(e,t){e.exports=i},function(e,t){e.exports=a},function(e,t){e.exports=c},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=(n(4),n(2)),a=n.n(i),c=(n(5),n(6),n(7),n(3)),s=n.n(c),u=n(1);function f(e){return(f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e,t){return!t||"object"!==f(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function y(e,t,n){return t&&g(e.prototype,t),n&&g(e,n),e}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=d(this,h(t).call(this,e))).resources="users",n.rowKey="id",n.size="small",n.bordered=!0,n.current={},n.pagination={page:"page",size:"size",total:"total"},n.add=function(){n.routeService.push("/modules/".concat(n.resources,"/add"))},n.edit=function(){n.routeService.push("/modules/".concat(n.resources,"/edit/").concat(n.id))},n.del=function(){n.apiService["".concat(n.resources,"_destroy")](n.current.item).then((function(){n.refresh()}))},n.handleTableChange=function(e){var t=e.current,r=e.pageSize,o=p({},n.pagination.page,t);n.page=t,n.pageSize=r,n.setState(o,(function(){n.load(o)}))},n.state={loading:!1,columns:n.columns,data:[]},n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,e),y(t,[{key:"page",get:function(){var e=nx.get(nx.$local,"curd__pagination.".concat(this.resources,".page"));return this._page||e||1},set:function(e){this._page=e,nx.$local=p({},"curd__pagination.".concat(this.resources,".page"),e)}},{key:"pageSize",get:function(){var e=nx.get(nx.$local,"curd__pagination.".concat(this.resources,".pageSize"));return this._pageSize||e||10},set:function(e){this._pageSize=e,nx.$local=p({},"curd__pagination.".concat(this.resources,".pageSize"),e)}},{key:"id",get:function(){return nx.get(this.current,"item.".concat(this.rowKey))}},{key:"fields",get:function(){return[]}},{key:"actions",get:function(){var e=this;return{title:"操作",width:80,render:function(){return o.a.createElement("span",{className:"mr5_ mr__ is-actions"},o.a.createElement("a",{onClick:e.edit},"编辑"),o.a.createElement(s.a,{onClick:e.del},"删除"))}}}},{key:"columns",get:function(){return this.actions?this.fields.concat(this.actions):this.fields}},{key:"extraView",get:function(){return o.a.createElement("div",{className:"is-extra"},o.a.createElement(u.Button,{size:"small",onClick:this.add,icon:"plus"},"新增"))}}]),y(t,[{key:"setResponse",value:function(e){return e}},{key:"initCache",value:function(){var e,t=this.pagination,n=t.page,r=t.size,o=t.total;this.state=Object.assign(this.state,(p(e={},n,this.page),p(e,r,this.pageSize),p(e,o,0),e))}},{key:"componentDidMount",value:function(){var e=this.pagination.page;this.initCache(),this.load(p({},e,this.state[e]))}},{key:"refresh",value:function(){var e,t=this.pagination,n=t.page,r=t.size;this.load((p(e={},n,this.state[n]),p(e,r,this.pageSize),e))}},{key:"load",value:function(e){var t=this,n=this.pagination.size,r=nx.mix(p({},n,this.pageSize),e);this.setState({loading:!0}),this.apiService["".concat(this.resources,"_index")](r).then((function(e){var n=t.setResponse(e),r=n.rows,o=n.total;t.setState({data:r,total:o,loading:!1})}))}},{key:"table",value:function(e){var t=this,n=e||{},r=this.state,i=r.columns,a=r.data,c=r.total,s=r.loading,f=this.pagination,p=f.page,d=f.size;return o.a.createElement(u.Table,l({loading:s,size:this.size,bordered:this.bordered,columns:i,dataSource:a,onChange:this.handleTableChange,rowKey:this.rowKey,onRow:function(e,n){return{onMouseEnter:function(){t.current={index:n,item:e}}}},pagination:{showSizeChanger:!0,total:c,pageSize:this.state[d],current:this.state[p]}},n))}},{key:"render",value:function(){throw new Error("Render method must be implement!")}}]),t}(r.Component);b.displayName="react-ant-abstract-curd",b.version="1.2.3",b.propTypes={className:a.a.string},b.defaultProps={};t.default=b}])}));