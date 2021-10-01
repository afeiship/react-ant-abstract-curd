# react-ant-abstract-curd
> Antd abstract curd.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-ant-abstract-curd
```

## usage
1. import css
  ```scss
  @import "~@jswork/boilerplate-react-component/dist/style.css";

  // or use sass
  @import "~@jswork/boilerplate-react-component/dist/style.scss";

  // customize your styles:
  $boilerplate-react-component-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import ReactAntAbstractCurd from '@jswork/boilerplate-react-component';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <ReactAntAbstractCurd />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/react-ant-abstract-curd/

## license
Code released under [the MIT license](https://github.com/afeiship/react-ant-abstract-curd/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-ant-abstract-curd
[version-url]: https://npmjs.org/package/@jswork/react-ant-abstract-curd

[license-image]: https://img.shields.io/npm/l/@jswork/react-ant-abstract-curd
[license-url]: https://github.com/afeiship/react-ant-abstract-curd/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-ant-abstract-curd
[size-url]: https://github.com/afeiship/react-ant-abstract-curd/blob/master/dist/react-ant-abstract-curd.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-ant-abstract-curd
[download-url]: https://www.npmjs.com/package/@jswork/react-ant-abstract-curd
