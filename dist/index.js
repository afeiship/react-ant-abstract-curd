!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("react"),require("prop-types"),require("antd"),require("@feizheng/react-ant-confirm"),require("react-dom"),require("classnames"),require("@feizheng/noop"),require("object-assign")):"function"==typeof define&&define.amd?define(["react","prop-types","antd","@feizheng/react-ant-confirm","react-dom","classnames","@feizheng/noop","object-assign"],t):"object"==typeof exports?exports.ReactAntAbstractCurd=t(require("react"),require("prop-types"),require("antd"),require("@feizheng/react-ant-confirm"),require("react-dom"),require("classnames"),require("@feizheng/noop"),require("object-assign")):e.ReactAntAbstractCurd=t(e.react,e["prop-types"],e.antd,e["@feizheng/react-ant-confirm"],e["react-dom"],e.classnames,e["@feizheng/noop"],e["object-assign"])}(window,(function(e,t,n,r,o,i,a,c){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t){e.exports=o},function(e,t){e.exports=i},function(e,t){e.exports=a},function(e,t){e.exports=c},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=(n(4),n(1)),a=n.n(i),c=(n(5),n(6),n(7),n(3)),u=n.n(c),s=n(2);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function h(e,t,n){return t&&y(e.prototype,t),n&&y(e,n),e}function m(e,t){return(m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=function(e){function t(e){var n,r;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(r=p(this,d(t).call(this,e))).resource="users",r.rowKey="id",r.size="small",r.bordered=!0,r.pageSize=10,r.pagination={page:"page",size:"size",total:"total"},r.add=function(){r.routeService.push("/modules/".concat(r.resource,"/add"))},r.edit=function(e){r.routeService.push("/modules/".concat(r.resource,"/edit/").concat(r.currentId))},r.del=function(e){r.apiService["".concat(r.resource,"_destroy")](r.currentRow).then((function(){r.refresh()}))},r.handleTableChange=function(e){var t=e.current,n=f({},r.pagination.page,t);r.setState(n,(function(){r.load(n)}))},r.setPagination(),r.serviceInject();var o=r.pagination,i=o.page,a=o.size,c=o.total;return r.state=(f(n={loading:!1,columns:r.columns,data:[]},i,1),f(n,a,r.pageSize),f(n,c,0),n),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(t,e),h(t,[{key:"fields",get:function(){return[]}},{key:"actions",get:function(){var e=this;return{title:"操作",width:80,render:function(){return o.a.createElement("span",{className:"mr5_ mr__ is-actions"},o.a.createElement("a",{onClick:e.edit},"编辑"),o.a.createElement(u.a,{onClick:e.del},"删除"))}}}},{key:"columns",get:function(){return this.actions?this.fields.concat(this.actions):this.fields}},{key:"extraView",get:function(){return o.a.createElement("div",{className:"is-extra"},o.a.createElement(s.Button,{size:"small",onClick:this.add,icon:"plus"},"新增"))}}]),h(t,[{key:"setPagination",value:function(){}},{key:"setResponse",value:function(e){return e}},{key:"serviceInject",value:function(){this.apiService=null,this.routeService=null}},{key:"componentDidMount",value:function(){var e=this.pagination.page;this.load(f({},e,this.state[e]))}},{key:"refresh",value:function(){this.load({page:this.current,size:this.pageSize})}},{key:"load",value:function(e){var t=this,n=this.pagination.size,r=nx.mix(f({},n,this.pageSize),e);this.setState({loading:!0}),this.apiService["".concat(this.resource,"_index")](r).then((function(e){var n=t.setResponse(e),r=n.rows,o=n.total;t.setState({data:r,total:o,loading:!1})}))}},{key:"tableView",value:function(){var e=this.state,t=e.columns,n=e.data,r=e.total,i=e.loading,a=this.pagination.page;return o.a.createElement(s.Table,{loading:i,size:this.size,bordered:this.bordered,columns:t,dataSource:n,onChange:this.handleTableChange,rowKey:this.rowKey,pagination:{showSizeChanger:!0,total:r,current:this.state[a]}})}},{key:"render",value:function(){throw new Error("Render method must be implement!")}}]),t}(r.Component);b.displayName="react-ant-abstract-curd",b.version="1.0.2",b.propTypes={className:a.a.string,routeService:a.a.any,apiService:a.a.any},b.defaultProps={};t.default=b}])}));