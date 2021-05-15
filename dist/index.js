/*!
 *  name: @jswork/react-ant-abstract-curd
 *  description: Antd abstract curd.
 *  homepage: https://github.com/afeiship/react-ant-abstract-curd#readme
 *  version: 1.0.6
 *  date: 2021-05-15T13:10:35.097Z
 *  license: MIT
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ReactAntAbstractCurd=t():e.ReactAntAbstractCurd=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("antd")},function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("@jswork/react-ant-confirm")},function(e,t){e.exports=require("@jswork/react-empty-state")},function(e,t){e.exports=require("@jswork/react-admin-icons")},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(2),a=n.n(i),c=n(3),u=n.n(c),s=n(1),l=n(4),f=n.n(l),p=n(5),h=n.n(p);function d(e){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function g(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=S(e);if(t){var o=S(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return x(this,n)}}function x(e,t){return!t||"object"!==d(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function S(e){return(S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var _=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(a,e);var t,n,r,i=b(a);function a(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e)).resources="users",t.rowKey="id",t.size="small",t.bordered=!0,t.current={},t.options={},t.module="modules",t.pagination={page:"page",size:"size",total:"total"},t.add=function(){t.routeService.push("/".concat(t.module,"/").concat(t.resources,"/add"))},t.edit=function(){t.routeService.push("/".concat(t.module,"/").concat(t.resources,"/edit/").concat(t.id))},t.del=function(){var e=nx.mix(null,t.current.item,t.options);t.apiService["".concat(t.resources,"_destroy")](e).then((function(){t.refresh()}))},t.handleTableChange=function(e){var n,r=e.current,o=e.pageSize,i=t.pagination,a=i.page,c=i.size,u=(g(n={},a,r),g(n,c,o),n);t.page=r,t.pageSize=o,t.setState(u,(function(){t.load(u)}))};var n=t.pagination.total;return t.state=g({loading:!1,columns:t.columns,data:[]},n,0),t}return t=a,(n=[{key:"page",get:function(){var e=nx.get(nx.$local,"curd__pagination.".concat(this.resources,".page"));return this._page||e||1},set:function(e){this._page=e,nx.$local=g({},"curd__pagination.".concat(this.resources,".page"),e)}},{key:"pageSize",get:function(){var e=nx.get(nx.$local,"curd__pagination.".concat(this.resources,".pageSize"));return this._pageSize||e||10},set:function(e){this._pageSize=e,nx.$local=g({},"curd__pagination.".concat(this.resources,".pageSize"),e)}},{key:"id",get:function(){return nx.get(this.current,"item.".concat(this.rowKey))}},{key:"fields",get:function(){return[]}},{key:"actions",get:function(){var e=this;return{title:"操作",width:80,render:function(){return o.a.createElement("span",{className:"mr-5_ mr_ is-actions"},o.a.createElement("a",{onClick:e.edit},"编辑"),o.a.createElement(u.a,{onClick:e.del},"删除"))}}}},{key:"columns",get:function(){return this.actions?this.fields.concat(this.actions):this.fields}},{key:"extraView",get:function(){return o.a.createElement("div",{className:"is-extra"},o.a.createElement(s.Button,{size:"small",onClick:this.add,className:"mr-5_ mr_"},o.a.createElement(h.a,{value:"addition",size:14}),o.a.createElement("span",null,"新增")))}},{key:"setResponse",value:function(e){return e}},{key:"initCache",value:function(){var e,t=this.pagination,n=t.page,r=t.size,o=t.total;this.state=Object.assign(this.state,(g(e={},n,this.page),g(e,r,this.pageSize),g(e,o,0),e))}},{key:"componentDidMount",value:function(){var e=this,t=this.pagination.page;this.attachEvents(),this.initCache(),this.load(g({},t,this.state[t])),setTimeout((function(){nx.set(e.routeService,"current",e.props)}),0)}},{key:"componentWillUnmount",value:function(){this.detachEvents()}},{key:"attachEvents",value:function(){var e=this;this.refreshEvent=nx.$app.on("".concat(this.resources,".index.refresh"),(function(){e.refresh()}))}},{key:"detachEvents",value:function(){this.refreshEvent&&this.refreshEvent.destroy()}},{key:"refresh",value:function(){var e,t=this.pagination,n=t.page,r=t.size;this.load((g(e={},n,this.state[n]),g(e,r,this.pageSize),e))}},{key:"load",value:function(e,t){var n=this,r=t||"index",o=this.pagination.size,i=nx.mix(g({},o,this.pageSize),e,this.options);this.setState({loading:!0}),this.apiService["".concat(this.resources,"_").concat(r)](i).then((function(e){var t=n.setResponse(e),r=t.rows,o=t.total;n.setState({data:r,total:o,loading:!1})}))}},{key:"table",value:function(e){var t=this,n=e||{},r=this.state,i=r.columns,a=r.data,c=r.total,u=r.loading,l=this.pagination,f=l.page,p=l.size;return a.length?o.a.createElement(s.Table,y({loading:u,size:this.size,bordered:this.bordered,columns:i,dataSource:a,onChange:this.handleTableChange,rowKey:this.rowKey,onRow:function(e,n){return{onMouseEnter:function(){t.current={index:n,item:e}}}},pagination:{showSizeChanger:!0,total:c,pageSize:this.state[p],current:this.state[f]}},n)):null}},{key:"empty",value:function(){return o.a.createElement(f.a,{centered:!0,title:"暂无数据"})}},{key:"view",value:function(){var e=this.state.data;return o.a.createElement(s.Card,{title:"列表"},e.length?this.table():this.empty())}},{key:"render",value:function(){throw new Error("Render method must be implement!")}}])&&m(t.prototype,n),r&&m(t,r),a}(r.Component);_.displayName="react-ant-abstract-curd",_.version="1.0.6",_.propTypes={className:a.a.string},_.defaultProps={};t.default=_}])}));
//# sourceMappingURL=index.js.map