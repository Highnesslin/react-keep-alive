# 基于 React 的 keep-alive 组件

使用

```javascript
<AliveScope>
  <KeepAlive>
    <Component /> {/* 这里放入需要缓存的组件 */}
  </KeepAlive>
</AliveScope>
```

实例：

```javascript
export default function () {
  const [show, toggle] = useState(true);
  return (
    <>
      <button onClick={() => toggle(!show)}>toggle</button>
      <AliveScope>
        <App />
      </AliveScope>
    </>
  );
}

function App() {
  return (
    <div>
      {show && (
        <section>
          <p>无KeepAlive</p>
          <Count />
        </section>
      )}
      {show && (
        <section>
          <p>有KeepAlive</p>
          <KeepAlive>
            <Count />
          </KeepAlive>
        </section>
      )}
    </div>
  );
}

function Count() {
  const [count, setCount] = useState(0);
  return <div onClick={() => setCount(count + 1)}>{count}</div>;
}
```
