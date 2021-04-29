/*!
 *  name: @jswork/react-ant-abstract-curd
 *  description: Antd abstract curd.
 *  homepage: https://github.com/afeiship/react-ant-abstract-curd#readme
 *  version: 1.0.2
 *  date: 2021-04-29T01:35:19.710Z
 *  license: MIT
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ReactAntAbstractCurd=t():e.ReactAntAbstractCurd=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("antd")},function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("@jswork/react-ant-confirm")},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(2),a=n.n(i),c=n(3),u=n.n(c),s=n(1);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(){return(f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t){return(d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=v(e);if(t){var o=v(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return g(this,n)}}function g(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function v(e){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&d(e,t)}(a,e);var t,n,r,i=y(a);function a(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e)).resources="users",t.rowKey="id",t.size="small",t.bordered=!0,t.current={},t.options={},t.modules="/modules",t.pagination={page:"page",size:"size",total:"total"},t.add=function(){t.routeService.push("".concat(t.modules,"/").concat(t.resources,"/add"))},t.edit=function(){t.routeService.push("".concat(t.modules,"/").concat(t.resources,"/edit/").concat(t.id))},t.del=function(){t.apiService["".concat(t.resources,"_destroy")](t.current.item).then((function(){t.refresh()}))},t.handleTableChange=function(e){var n,r=e.current,o=e.pageSize,i=t.pagination,a=i.page,c=i.size,u=(p(n={},a,r),p(n,c,o),n);t.page=r,t.pageSize=o,t.setState(u,(function(){t.load(u)}))};var n=t.pagination.total;return t.state=p({loading:!1,columns:t.columns,data:[]},n,0),t}return t=a,(n=[{key:"page",get:function(){var e=nx.get(nx.$local,"curd__pagination.".concat(this.resources,".page"));return this._page||e||1},set:function(e){this._page=e,nx.$local=p({},"curd__pagination.".concat(this.resources,".page"),e)}},{key:"pageSize",get:function(){var e=nx.get(nx.$local,"curd__pagination.".concat(this.resources,".pageSize"));return this._pageSize||e||10},set:function(e){this._pageSize=e,nx.$local=p({},"curd__pagination.".concat(this.resources,".pageSize"),e)}},{key:"id",get:function(){return nx.get(this.current,"item.".concat(this.rowKey))}},{key:"fields",get:function(){return[]}},{key:"actions",get:function(){var e=this;return{title:"操作",width:80,render:function(){return o.a.createElement("span",{className:"mr5_ mr__ is-actions"},o.a.createElement("a",{onClick:e.edit},"编辑"),o.a.createElement(u.a,{onClick:e.del},"删除"))}}}},{key:"columns",get:function(){return this.actions?this.fields.concat(this.actions):this.fields}},{key:"extraView",get:function(){return o.a.createElement("div",{className:"is-extra"},o.a.createElement(s.Button,{size:"small",onClick:this.add,icon:"plus"},"新增"))}},{key:"setResponse",value:function(e){return e}},{key:"initCache",value:function(){var e,t=this.pagination,n=t.page,r=t.size,o=t.total;this.state=Object.assign(this.state,(p(e={},n,this.page),p(e,r,this.pageSize),p(e,o,0),e))}},{key:"componentDidMount",value:function(){var e=this.pagination.page;this.attachEvents(),this.initCache(),this.load(p({},e,this.state[e]))}},{key:"componentWillUnmount",value:function(){this.detachEvents()}},{key:"attachEvents",value:function(){var e=this;this.refreshEvent=nx.$app.on("".concat(this.resources,".index.refresh"),(function(){e.refresh()}))}},{key:"detachEvents",value:function(){this.refreshEvent&&this.refreshEvent.destroy()}},{key:"refresh",value:function(){var e,t=this.pagination,n=t.page,r=t.size;this.load((p(e={},n,this.state[n]),p(e,r,this.pageSize),e))}},{key:"load",value:function(e,t){var n=this,r=t||"index",o=this.pagination.size,i=nx.mix(p({},o,this.pageSize),e,this.options);this.setState({loading:!0}),this.apiService["".concat(this.resources,"_").concat(r)](i).then((function(e){var t=n.setResponse(e),r=t.rows,o=t.total;n.setState({data:r,total:o,loading:!1})}))}},{key:"table",value:function(e){var t=this,n=e||{},r=this.state,i=r.columns,a=r.data,c=r.total,u=r.loading,l=this.pagination,p=l.page,h=l.size;return a.length?o.a.createElement(s.Table,f({loading:u,size:this.size,bordered:this.bordered,columns:i,dataSource:a,onChange:this.handleTableChange,rowKey:this.rowKey,onRow:function(e,n){return{onMouseEnter:function(){t.current={index:n,item:e}}}},pagination:{showSizeChanger:!0,total:c,pageSize:this.state[h],current:this.state[p]}},n)):null}},{key:"render",value:function(){throw new Error("Render method must be implement!")}}])&&h(t.prototype,n),r&&h(t,r),a}(r.Component);b.displayName="react-ant-abstract-curd",b.version="1.0.2",b.propTypes={className:a.a.string},b.defaultProps={};t.default=b}])}));
//# sourceMappingURL=index.js.map