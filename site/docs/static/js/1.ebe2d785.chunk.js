webpackJsonp([1],{74:function(n,t){n.exports="## Store \u662f\u4ec0\u4e48\uff1f\n\nStore \u662f Omi \u5185\u7f6e\u7684\u4e2d\u5fc3\u5316\u6570\u636e\u4ed3\u5e93\uff0c\u4ed6\u89e3\u51b3\u548c\u63d0\u4f9b\u4e86\u4e0b\u9762\u95ee\u9898\u548c\u80fd\u529b\uff1a\n\n* \u7ec4\u4ef6\u6811\u6570\u636e\u5171\u4eab\n* \u6570\u636e\u53d8\u66f4\u6309\u9700\u66f4\u65b0\u4f9d\u8d56\u7684\u7ec4\u4ef6\n\n![](https://github.com/Tencent/omi/raw/master/assets/store.cn.jpg)\n\n\n## \u5feb\u901f\u6982\u89c8\n\n\u6574\u4e2a\u7ec4\u4ef6\u6811\u5171\u4eab\u6570\u636e\uff0c\u5e76\u4e14\u6570\u636e\u53d8\u66f4\u81ea\u52a8\u66f4\u65b0\u89c6\u56fe\u3002\n\n```jsx\nimport { define, render } from 'omi'\n\nclass Store {\n  data = {\n    count: 1\n  }\n  sub = () => {\n    this.data.count--\n  }\n  add = () => {\n    this.data.count++\n  }\n}\n\ndefine('my-counter', _ => (\n  <div>\n    <button onClick={_.store.sub}>-</button>\n    <span>{_.store.data.count}</span>\n    <button onClick={_.store.add}>+</button>\n  </div>\n), {\n    use: ['count'], \n    //\u6216\u8005\u4f7f\u7528 useSelf, useSelf \u53ea\u4f1a\u66f4\u65b0\u81ea\u8eab\uff0c\u4e0d\u66f4\u65b0\u5b50\u7ec4\u4ef6\n    //useSelf: ['count'], \n    css: `span { color: red; }`,\n    installed() {\n      console.log('installed')\n    }\n  })\n\nrender(<my-counter />, 'body', new Store)\n```\n\n* `<my-counter></my-counter>` \u53ef\u4ee5\u7528\u4e8e\u4efb\u610f\u6846\u67b6\u6216\u8005\u65e0\u6846\u67b6\uff0c\u6bd4\u5982 `document.createElement('my-counter')`\n\n\n\u4f60\u4e5f\u53ef\u4ee5\u4f7f\u7528 `useSelf`, `useSelf` \u53ea\u4f1a\u66f4\u65b0\u81ea\u8eab\uff0c\u4e0d\u66f4\u65b0\u5b50\u7ec4\u4ef6\u3002\u4f7f\u7528 `useSelf` \u7684\u65f6\u5019\u5728 JSX \u91cc\u901a\u8fc7 `usingSelf` \u8bbf\u95ee\u5bf9\u5e94\u5c5e\u6027\u3002\n\n\u4f60\u4e5f\u53ef\u4ee5\u901a\u8fc7 `compute` \u53bb\u5b9e\u73b0 `computed` \u8ba1\u7b97\u5c5e\u6027\uff0c\u6bd4\u5982:\n\n```jsx\ndefine('my-counter', _ => (\n  <div>\n    <button onClick={_.store.sub}>-</button>\n    <span>{_.store.data.count}</span>\n    <button onClick={_.store.add}>+</button>\n    <div>Double: {_.computed.doubleCount}</div>\n  </div>\n), {\n    use: ['count'],\n    compute: {\n      doubleCount() {\n        return this.count * 2\n      }\n    }\n  })\n```\n\n\u8def\u5f84\u4e5f\u662f\u652f\u6301\u7684\uff0c\u6bd4\u5982\u4e0b\u9762\u7684\u4f8b\u5b50:\n\n```js\nclass Store {\n  data = {\n    list: [\n      { name: { first: 'dnt', last: 'zhang' } }\n    ]\n  }\n}\n\n...\n...\n\ndefine('my-counter', _ => (\n  ...\n  ...\n), {\n    use: [\n      'list[0].name', //\u53ef\u4ee5\u901a\u8fc7 this.using[0] \u8bbf\u95ee\n    ],\n    compute: {\n      fullName() {\n        return this.list[0].name.first + this.list[0].name.last\n      }\n    }\n  })\n```\n\n![](https://tencent.github.io/omi/assets/store.cn.jpg)\n\n### \u591a\u4e2a store \u6ce8\u5165\n\n```jsx\nimport { define, render } from 'omi'\n\ndefine('my-app', _ => {\n  const store = _.store.storeA\n  const { data, add, sub } = store\n  return (\n    <p>\n      Clicked: {data.count} times\n      <button onClick={add}>+</button>\n      <button onClick={sub}>-</button>\n\n      <div>\n        {_.store.storeB.data.msg}\n        <button  onClick={_.store.storeB.changeMsg}>\n          change storeB's msg\n        </button>\n      </div>\n    </p>\n  )\n}, {\n  useSelf: {\n    storeA: ['count', 'adding'],\n    storeB: ['msg']\n  }\n})\n\nconst storeA = new class Store {\n  data = {\n    count: 0,\n    adding: false\n  }\n  sub = () => {\n    this.data.count--\n  }\n  add = () => {\n    this.data.count++\n  }\n}\n\nconst storeB = new class Store {\n  data = {\n    msg: 'abc'\n  }\n  changeMsg = () => {\n    this.data.msg = 'bcd'\n  }\n}\n\nrender( <my-app /> , 'body', {\n  storeA,\n  storeB\n})\n```\n\n\u600e\u4e48\u5728\u6ce8\u5165\u591a store \u7684\u65f6\u5019\u4f7f\u7528 `compute` and `computed`? \u975e\u5e38\u7b80\u5355\uff1a\n\n```jsx\ndefine('my-app', _ => {\n  const store = _.store.storeA\n  const { data, add, sub } = store\n  return (\n    <p>\n      Clicked: {data.count} times\n      <button onClick={add}>+</button>\n      <button onClick={sub}>-</button>\n\n      <div>\n        {_.store.storeB.data.msg}\n        <button onClick={_.store.storeB.changeMsg}>\n          change storeB's msg\n        </button>\n      </div>\n\n      <div>{_.computed.dobuleCount}</div>\n      <div>{_.computed.reverseMsg}</div>\n    </p>\n  )\n}, {\n    useSelf: {\n      storeA: ['count', 'adding'],\n      storeB: ['msg']\n    },\n    compute: {\n      dobuleCount() {\n        return this.storeA.data.count * 2\n      },\n      reverseMsg() {\n        return this.storeB.data.msg.split('').reverse().join('')\n      }\n    }\n  })\n```\n\n### API \u548c \u94a9\u5b50\n\n```jsx\ndefine('my-component', _ => (\n  ...\n  ...\n), {\n    use: ['path', 'path.a', 'path[1].b'],\n    useSelf: ['path.c', 'path[1].d'],\n    css: 'h1 { color: red; }',\n    propTypes: { },\n    defaultProps: { },\n    isLightDom: true, //default is false\n\n    //\u751f\u547d\u5468\u671f\n    install() { }, \n    installed() { }, \n    uninstall() { }, \n    receiveProps() { },\n    beforeUpdate() { }, \n    updated() { }, \n    beforeRender() { }, \n    rendered() { },\n    \n    //\u81ea\u5b9a\u4e49\u65b9\u6cd5\n    myMethodA() { },\n    myMethodB() { }\n\n  })\n```\n\n### \u901a\u8fc7 prop \u6ce8\u5165 use \u6216 useSelf\n\n```jsx\n<my-counter use={['count']} ></my-counter>\n```\n\n## \u4e00\u6bb5\u4ee3\u7801\u5b8c\u5168\u4e0a\u624b Store\n\n```jsx\nimport { render, WeElement, define } from 'omi'\n\ndefine('my-counter', class extends WeElement {\n  use = ['count', 'adding']\n\n  addIfOdd = () => {\n    if (this.store.data.count % 2 !== 0) {\n      this.store.add()\n    }\n  }\n\n  addAsync = () => {\n    this.store.data.adding = true\n    setTimeout(() => {\n      this.store.data.adding = false\n      this.store.add()\n    }, 1000)\n  }\n\n  render() {\n    const store = this.store\n    const { data, add, sub } = store\n    return (\n      <p>\n        Clicked: {data.count} times\n        {' '}\n        <button onClick={add}>+</button>\n        {' '}\n        <button onClick={sub}>-</button>\n        {' '}\n        <button disabled={data.count % 2 === 0} onClick={this.addIfOdd}>\n          Add if odd\n        </button>\n        {' '}\n        <button disabled={data.adding} onClick={this.addAsync}>\n          Add async\n        </button>\n      </p>\n    )\n  }\n})\n\nrender(<my-counter />, 'body', new class Store {\n  data = {\n    count: 0,\n    adding: false\n  }\n  sub = () => {\n    this.data.count--\n  }\n  add = () => {\n    this.data.count++\n  }\n})\n```\n\n* \u901a\u8fc7 `use` \u58f0\u660e\u4f9d\u8d56\u7684 path\uff0c\u5f53\u7136\u4e5f\u53ef\u4ee5\u4f7f\u7528 `useSelf`\uff0c`useSelf`\u89e6\u53d1\u7684\u66f4\u65b0\u53ea\u4f1a\u66f4\u65b0\u81ea\u5df1\uff0c\u4e0d\u4f1a\u66f4\u65b0\u5b50\u7ec4\u4ef6\u3002\n* `store` \u901a\u8fc7 render \u7684\u7b2c\u4e09\u4e2a\u53c2\u6570\u4ece\u6839\u8282\u70b9\u6ce8\u5165\u5230\u6240\u6709\u7ec4\u4ef6\u3002\n\n\u4e0b\u9762\u4e3e\u4e00\u4e2a\u590d\u6742\u7684 `use` \u4f8b\u5b50\u3002\n\nStore \u91cc\u7684 data:\n\n```json\n{\n  count: 0,\n  arr: ['china', 'tencent'],\n  motto: 'I love omi.',\n  userInfo: {\n    firstName: 'dnt',\n    lastName: 'zhang',\n    age: 18\n  }\n}\n```\n\nUse \u548c Compute \u8bed\u6cd5\u5982\u4e0b:\n\n```jsx\nuse = [\n  'count', //\u76f4\u63a5\u5b57\u7b26\u4e32\uff0c\u53ef\u901a\u8fc7 this.using[0] \u8bbf\u95ee\n  'arr[0]', //\u4e5f\u652f\u6301 path\uff0c\u53ef\u901a\u8fc7 this.using[1] \u8bbf\u95ee\n  'motto',\n  'userInfo',\n  { name: 'arr[1]' } //{ alias: path }\uff0c\u53ef\u901a\u8fc7 this.using.name \u8bbf\u95ee\n]\n\ncompute = {\n  reverseMotto() {\n    return this.motto.split('').reverse().join('')\n  },\n  fullName() {\n    return this.userInfo.firstName + this.userInfo.lastName\n  }\n}\n```\n\n\u4e0b\u9762\u770b\u770b JSX \u4e2d\u4f7f\u7528:\n\n```jsx\n...\n...\nrender() {\n  return (\n    <div>\n      <button onClick={this.sub}>-</button>\n      <span>{this.using[0]}</span>\n      <button onClick={this.add}>+</button>\n      <div>\n        <span>{this.using[1]}</span>\n        <button onClick={this.rename}>rename</button>\n      </div>\n      <div>{this.computed.reverseMotto}</div><button onClick={this.changeMotto}>change motto</button>\n      <div>{this.using.name}</div>\n      <div>{this.using[3]}</div>\n      <div>\n        {this.computed.fullName}\n        <button onClick={this.changeFirstName}>change first name</button>\n      </div>\n    </div>\n  )\n}\n...\n...\n```\n\n\u5982\u679c\u4e0d\u5e26\u6709 alias \uff0c\u4f60\u4e5f\u53ef\u4ee5\u76f4\u63a5\u901a\u8fc7 `this.store.data.xxx` \u8bbf\u95ee\u3002\n\n\n\u5f53 `store.data` \u53d1\u751f\u53d8\u5316\uff0c\u4f9d\u8d56\u53d8\u66f4\u6570\u636e\u7684\u7ec4\u4ef6\u4f1a\u8fdb\u884c\u66f4\u65b0\uff0c\u4e3e\u4f8b\u8bf4\u660e Path \u547d\u4e2d\u89c4\u5219:\n\n| Proxy Path(\u7531\u6570\u636e\u66f4\u6539\u4ea7\u751f) |  use \u4e2d\u7684 path | \u662f\u5426\u66f4\u65b0 |\n| ---------- | ---------- | -------- |\n| abc        | abc        | \u66f4\u65b0     |\n| abc[1]     | abc        | \u66f4\u65b0     |\n| abc.a      | abc        | \u66f4\u65b0     |\n| abc        | abc.a      | \u4e0d\u66f4\u65b0   |\n| abc        | abc[1]     | \u4e0d\u66f4\u65b0   |\n| abc        | abc[1].c   | \u4e0d\u66f4\u65b0   |\n| abc.b      | abc.b      | \u66f4\u65b0     |\n\n\u4ee5\u4e0a\u53ea\u8981\u547d\u4e2d\u4e00\u4e2a\u6761\u4ef6\u5c31\u53ef\u4ee5\u8fdb\u884c\u66f4\u65b0\uff01\n\n\u603b\u7ed3\uff1a \u53ea\u8981\u6ce8\u5165\u7ec4\u4ef6\u7684 path \u7b49\u4e8e use \u91cc\u58f0\u660e \u6216\u8005\u5728 use \u91cc\u58f0\u660e\u7684\u5176\u4e2d path \u5b50\u8282\u70b9\u4e0b\u5c31\u4f1a\u8fdb\u884c\u66f4\u65b0\uff01\n\n### \u89e3\u6784\u8d4b\u503c\n\n```jsx\nimport { define, WeElement } from 'omi'\nimport '../my-list'\n\ndefine('my-sidebar', class extends WeElement {\n  static css = require('./_index.css')\n\n  use = [\n    'menus',\n    'sideBarShow',\n    'lan'\n  ]\n\n  render() {\n    const [menus, sideBarShow, lan] = this.using\n\n    return (\n      <div class={`list${sideBarShow ? ' show' : ''}`}>\n        {menus[lan].map((menu, index) => (\n          <my-list menu={menu} index={index} />\n        ))}\n      </div>\n    )\n  }\n})\n```\n\n\u8fd9\u91cc\u4e3e\u4e86\u4e2a\u4f8b\u5b50\u4f7f\u7528 ES2015+ \u8bed\u6cd5  `const [xx, xxx] = xxxx` \u7684\u8bed\u6cd5\u5feb\u901f\u8d4b\u503c\u3002\n\n## \u52a8\u6001 use\n\n\u5982\u679c\u4f60\u4e0d\u5e0c\u671b\u540c\u6837\u7684\u7ec4\u4ef6\u62e5\u6709\u540c\u6837\u7684\u4f9d\u8d56\uff0c\u53ef\u4ee5\u4f7f\u7528\u52a8\u6001\u7684 use\uff1a\n\n\n```js\nuse() {\n  return [\n    'a.b',\n    'c[1].d',\n    `e.f.${xxx}.d[${index}]`\n  ]\n}\n```\n\n## \u51fd\u6570\u5f0f\u98ce\u683c \n\n```jsx\nimport { define, render } from 'omi'\n\nclass Store {\n  data = {\n    count: 1\n  }\n  sub = () => {\n    this.data.count--\n  }\n  add = () => {\n    this.data.count++\n  }\n}\n\ndefine('my-counter', ['count'], _ => (\n  <div>\n    <button onClick={_.store.sub}>-</button>\n    <span>{_.store.data.count}</span>\n    <button onClick={_.store.add}>+</button>\n  </div>\n))\n\nrender(<my-counter />, 'body', new Store)\n```\n\n\u975e\u5e38\u7075\u6d3b\uff01\n"}});
//# sourceMappingURL=1.ebe2d785.chunk.js.map