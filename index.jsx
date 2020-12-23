import React, { Component, createContext } from 'react';

const { Provider, Consumer } = createContext();
const withAliveScope = WrappedComponent => props => (
  <Consumer>{keep => <WrappedComponent {...props} keep={keep} />}</Consumer>
);

export class AliveScope extends Component {
  nodes = {}; // 子组件 父容器的集合
  state = {}; // id对应组件的形式

  // 【关键】 供消费者使用的方法，用于同步 子组件集合
  keep = (id, children) =>
    new Promise(resolve =>
      this.setState(
        {
          [id]: { id, children },
        },
        () => resolve(this.nodes[id])
      )
    );

  render() {
    return (
      <Provider value={this.keep}>
        {/* 首先要渲染一次子组件，否则首次进入时 子组件不存在 */}
        {this.props.children}
        {/* 渲染子组件集合 */}
        {Object.values(this.state).map(({ id, children }) => (
          <div
            className="alive-scope"
            key={id}
            ref={node => {
              this.nodes[id] = node;
            }}
          >
            {children}
          </div>
        ))}
      </Provider>
    );
  }
}

class KeepAlive extends Component {
  constructor(props) {
    super(props);
    // 首次进入时，调用 context 中的keep方法，获取组件
    this.init(props);
  }

  init = async ({ id, children, keep }) => {
    const realContent = await keep(id, children);
    console.log('realContent', realContent);
    this.placeholder.appendChild(realContent);
  };

  render() {
    return (
      <div
        className="keep-alive"
        ref={node => {
          this.placeholder = node;
        }}
      />
    );
  }
}

export default withAliveScope(KeepAlive);

/**
 * <keep-alive>
 *    {show && <Component />}
 * </keep-alive>
 *
 */
