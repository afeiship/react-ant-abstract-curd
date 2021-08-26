/*!
 *  name: @jswork/react-ant-abstract-curd
 *  description: Antd abstract curd.
 *  homepage: https://github.com/afeiship/react-ant-abstract-curd#readme
 *  version: 1.0.14
 *  date: 2021-08-26T05:07:18.873Z
 *  license: MIT
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ReactAntAbstractCurd=t():e.ReactAntAbstractCurd=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("antd")},function(e,t){e.exports=require("prop-types")},function(e,t){e.exports=require("@jswork/react-ant-confirm")},function(e,t){e.exports=require("@jswork/react-empty-state")},function(e,t){e.exports=require("@jswork/react-admin-icons")},function(e,t){e.exports=require("@jswork/next-hashlize")},function(e,t){e.exports=require("deep-equal")},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(2),a=n.n(i),c=n(3),u=n.n(c),s=n(1),l=n(4),f=n.n(l),p=n(5),h=n.n(p),d=n(6),y=n.n(d),g=n(7),m=n.n(g);function v(e){return(v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function x(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return S(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function w(e,t){return(w=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=O(e);if(t){var o=O(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return j(this,n)}}function j(e,t){return!t||"object"!==v(t)&&"function"!=typeof t?z(e):t}function z(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function O(e){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function E(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var C=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&w(e,t)}(a,e);var t,n,r,i=_(a);function a(e){var t;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),E(z(t=i.call(this,e)),"engineType","local"),E(z(t),"resources","users"),E(z(t),"rowKey","id"),E(z(t),"size","small"),E(z(t),"bordered",!0),E(z(t),"current",{}),E(z(t),"module","modules"),E(z(t),"action","index"),E(z(t),"pagination",{page:"page",size:"size",total:"total"}),E(z(t),"route",(function(e,n){var r="/".concat(t.module,"/").concat(t.resources,"/").concat(e),o=n?"replace":"push";t.routeService[o](r)})),E(z(t),"add",(function(){t.routeService.push("/".concat(t.module,"/").concat(t.resources,"/add"))})),E(z(t),"edit",(function(){t.routeService.push("/".concat(t.module,"/").concat(t.resources,"/edit/").concat(t.id))})),E(z(t),"del",(function(){var e=nx.mix(null,t.current.item,t.options);t.apiService["".concat(t.resources,"_destroy")](e).then((function(){t.refresh()}))})),E(z(t),"handleTableChange",(function(e){var n,r=e.current,o=e.pageSize,i=t.pagination,a=i.page,c=i.size,u=(E(n={},a,r),E(n,c,o),n);t.page=r,t.pageSize=o,t.setState(u,(function(){t.load(u)}))}));var n=t.pagination.total;return t.lastQs=t.qs,t.state=nx.mix(null,t.initialState(),E({loading:!1,columns:t.columns,data:[]},n,0)),t.init(),t}return t=a,(n=[{key:"options",get:function(){return{}}},{key:"page",get:function(){var e=nx.get(nx["$".concat(this.engineType)],"curd__pagination.".concat(this.resources,".page"));return this._page||e||1},set:function(e){this._page=e,nx["$".concat(this.engineType)]=E({},"curd__pagination.".concat(this.resources,".page"),e)}},{key:"pageSize",get:function(){var e=nx.get(nx["$".concat(this.engineType)],"curd__pagination.".concat(this.resources,".pageSize"));return this._pageSize||e||10},set:function(e){this._pageSize=e,nx["$".concat(this.engineType)]=E({},"curd__pagination.".concat(this.resources,".pageSize"),e)}},{key:"id",get:function(){return nx.get(this.current,"item.".concat(this.rowKey))}},{key:"fields",get:function(){return[]}},{key:"actions",get:function(){var e=this;return{title:"操作",width:80,render:function(){return o.a.createElement("span",{className:"mr-5_ mr_ is-actions"},o.a.createElement("a",{onClick:e.edit},"编辑"),o.a.createElement(u.a,{onClick:e.del},"删除"))}}}},{key:"columns",get:function(){return this.actions?this.fields.concat(this.actions):this.fields}},{key:"extraView",get:function(){return o.a.createElement("div",{className:"is-extra"},o.a.createElement(s.Button,{size:"small",onClick:this.add,className:"mr-5_ mr_"},o.a.createElement(h.a,{value:"addition",size:14}),o.a.createElement("span",null,"新增")))}},{key:"params",get:function(){return nx.get(this.props,"match.params")}},{key:"qs",get:function(){var e=location.hash.slice(1);if(!e)return{};var t=x(e.split("?"),2),n=(t[0],t[1]);return y()(n)}},{key:"initialState",value:function(){return null}},{key:"setResponse",value:function(e){return e}},{key:"init",value:function(){}},{key:"initCache",value:function(){var e,t=this.pagination,n=t.page,r=t.size,o=t.total;this.state=Object.assign(this.state,(E(e={},n,this.page),E(e,r,this.pageSize),E(e,o,0),e))}},{key:"componentDidMount",value:function(){var e=this,t=this.pagination.page;this.attachEvents(),this.initCache(),this.load(E({},t,this.state[t])),setTimeout((function(){nx.set(e.routeService,"current",e.props)}),0)}},{key:"shouldComponentUpdate",value:function(){return m()(this.qs,this.lastQs)||(this.lastQs=this.qs,this.refresh()),!0}},{key:"componentWillUnmount",value:function(){this.detachEvents()}},{key:"attachEvents",value:function(){var e=this;this.refreshEvent=nx.$app.on("".concat(this.resources,".").concat(this.action,".refresh"),(function(){e.refresh()}))}},{key:"detachEvents",value:function(){this.refreshEvent&&this.refreshEvent.destroy()}},{key:"refresh",value:function(){var e,t=this.pagination,n=t.page,r=t.size;this.load((E(e={},n,this.state[n]),E(e,r,this.pageSize),e))}},{key:"load",value:function(e,t){var n=this,r=t||this.action||"index",o=this.pagination.size,i=nx.mix(E({},o,this.pageSize),e,this.options);this.setState({loading:!0}),this.apiService["".concat(this.resources,"_").concat(r)](i).then((function(e){var t=n.setResponse(e),r=t.rows,o=t.total;n.setState({data:r,total:o,loading:!1})}))}},{key:"table",value:function(e){var t=this,n=e||{},r=this.state,i=r.columns,a=r.data,c=r.total,u=r.loading,l=this.pagination,f=l.page,p=l.size;return o.a.createElement(s.Table,b({loading:u,size:this.size,bordered:this.bordered,columns:i,dataSource:a,onChange:this.handleTableChange,rowKey:this.rowKey,onRow:function(e,n){return{onMouseEnter:function(){t.current={index:n,item:e}}}},pagination:{showSizeChanger:!0,total:c,pageSize:this.state[p],current:this.state[f]}},n))}},{key:"empty",value:function(){return o.a.createElement(f.a,{centered:!0,title:"暂无数据"})}},{key:"view",value:function(){var e=this.state.data;return o.a.createElement(s.Card,{title:"列表"},e.length?this.table():this.empty())}},{key:"render",value:function(){throw new Error("Render method must be implement!")}}])&&k(t.prototype,n),r&&k(t,r),a}(r.Component);E(C,"displayName","react-ant-abstract-curd"),E(C,"version","1.0.14"),E(C,"propTypes",{className:a.a.string}),E(C,"defaultProps",{});t.default=C}])}));
//# sourceMappingURL=index.js.map