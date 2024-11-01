## Vite-React-Hooks

### 配置路径提示 @

-   安装 @types/node

```javascript
npm i -D @types/node
```

-   再 vite.config.ts 中配置别名

```javascript
    resolve: {
        alias: {
            '@': join(__dirname, './src/') // 使用@ 符号来代替 src目录
        }
    }
```

-   再 tsconfig.node.json 中配置 路径提示

```javascript
    {
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"] // 配置ts路径提示
        }
    },
```

## `useState` 能让含函数组件拥有自己的状态，他是一个管理状态的 hooks Api 。 通过 useState 可以实现状态的初始化，读取，更新。

```javascript
const [状态名, set函数] = useState(初始值) // set函数修改状态是异步修改，执行了修改函数后直接打印还是会获取到上一次的值
```

-   #### set 函数也可以接收一个回调函数 `setXXX((prev)=> {return prev+1})` 函数中基于 prev 计算一个新的值并返回。

-   #### 如果修改 state 状态，新值需要依赖于旧值作计算得到时，不建议直接在外部计算值后调用 setState ，应该时间在 set 函数中传递回调，获取旧值的方式来计算新值

-   #### set 函数修改引用类型数据时，需要给传一个新对象的地址，否则 react 无法监听到数据变化

```javascript
const [user, setUser] = useState({
    name: 'jett',
    age: '18',
    contury: 'kora',
})
// 修改的方法
const changeUser = () => {
    user.name = 'gaiko'
    user.age = 16
    setUser({ ...user })
}
```

## useEffect 副作用函数，用来监听依赖项状态变化来执行对应的回调操作

-   如果在 set 函数执行后想要立刻查看结果，可以使用 useEffect 函数，监听到状态变化是进行处理，

-   `useEffect(fn, [依赖项])` useEffect 接受两个参数 第一个参数是回调函数，第二个参数是一个数组，数组里写入监听的参数

-   useEffect 中的 fn 回调函数，在组件首次渲染后，默认会执行一次
-   useEffect 中的 fn 回调函数会在 每次组件渲染完毕之后,判断数组中的依赖项是否发生改变执行

### 简单示例

```javascript
import React from 'react'
import { useState, useEffect } from 'react'

// React.FC<T> 表示这是一个函数式的react组件
const App: React.FC = () => {
    const [count, setCount] = useState(0)
    const add = () => {
        // setCount(count + 1) // 是异步的修改状态，无法直接获取到最新的值
        setCount(prev => prev + 1)
        setCount(prev => prev + 1)
    }

    useEffect(() => {
        console.log(count)
    }, [count])
    return (
        <>
            <h1>这里是手写的一个app组件</h1>
            <div>{count}</div>
            <button onClick={add}>点击增加</button>
        </>
    )
}

export default App
```

### TIPS：useState 当状态变化时，会触发函数组件的重新执行

当函数式组件被重新执行时，不会从重复调用 useState()给数据赋初始值，而是会使用上次的 state 值

## 以函数的方式，给 useState 赋初始值 return 的对象内容就是 数据的初始值

```javascript
const [date, setDate] = useState(() => {
    const dt = new Date()
    return {
        // useState函数的返回值就是 变量的值
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
    }
})
```

### 使用 useState 实现组件强制刷新 (当数据变更时会刷新组件)

```javascript
const [, forceUpdate] = useState({})

const handleUpadte = () => {
    forceUpade({})
}
// dom
return (
    <>
        <button onClick="handleUpadte"></button>
    </>
)
```

## useRef 函数返回的一个可变的 ref 对象，该对象只有一个 current 属性，可以在调用 useRef 函数时为他指定初始值，并且这个返回的 ref 对象在整个生命周期内保持不变

### useRef 的作用

-   _获取 DOM 元素或子组件的实例对象_
-   _存储渲染周期之间的共享数据_

### 使用 useRef 获取 dom 元素

```javascript
import React from 'react'
import { useRef } from 'react'
const BaseUseRef: React.FC = () => {
    // 获取dom元素的时候 需要给useRef 复制为null 且在绑定的元素中增加ref属性
    const inputRef = useRef < HTMLInputElement > null
    const handleGetInput = () => {
        console.log(inputRef.current)
        inputRef.current?.focus()
    }
    return (
        <>
            <div>useRef</div>
            <input type="text" ref={inputRef} />
            <button onClick={handleGetInput}>获取input输入框</button>
        </>
    )
}

export default BaseUseRef
```

### 使用 useRef 实现周期之前的数据共享

-   useRef 只在组件首次渲染时被执行,如果通过 setState 触发了组件的重新渲染,useRef 方法不会执行,会保留上一次的数据
-   ref.current 发生变化时,数据会改变,但是组件不会重新渲染
-   ref.current 无法成为其他 hook 的依赖,例如 useEffect
    无法监听到 ref.current 的变化而执行操作
    但是 当从 state 变化时 ,之前的变化 会让 useEffect 检测到而执行

```javascript
import React, { useState } from 'react'
import { useRef } from 'react'
const BaseUseRef: React.FC = () => {
    // 获取dom元素的时候 需要给useRef 复制为null 且在绑定的元素中增加ref属性
    const [count, setCount] = useState(0)
    const preCount = useRef<number>()
    // 在react 组件中不可以通过直接定义来保存之前的值，因为每次 count被重新赋值时，会触发函数组件的重新执行
    // 重新执行后 prev又会被初始化为undefined
    // 可以将prev定义在 函数式组件的外面 这样更新的时候就不会 将prev重新赋值
    let prev
    const handleAddCount = () => {
        // setCount(count + 1)
        preCount.current = count
        prev = count
        setCount(c => c + 1)
    }
    return (
        <>
            <div>useRef</div>
            <div>
                现在的count是 {count}，原来的count是 {preCount.current}
                这种方式是错的{prev} 显示不出
            </div>
            <button onClick={handleAddCount}>点击增加count</button>
        </>
    )
}

export default BaseUseRef

```

## forwardRef ref 的作用是获取实例,而函数组件不存在实例,所以无法通过 ref 获取到,需要用到 react.forwardRef

-   例子涉及到父子组件 获取 ref 及子组件向外暴露数据

**如果 在父组件中使用了 ref 来获取子组件 , 普通的函数组件时获取不到的,因为无法获取到实例**

_如果 在父组件中使用了 ref 来获取子组件 , 普通的函数组件时获取不到的,因为无法获取到实例_

_const Child:React.FC =()=>{<></>} 比如这样写,就会报错_
_为了获取到子组件的内容需要使用 React.forwardRef 这个方法 包裹对应的函数组件_

_React.forwardRef 接受两个参数,第一个参数是 props 父组件对子组件传递的参数 ,第二个就是 ref 参数_

_需要引入 react 的 useImperativeHandle 方法 ,在子组件内自定义要被暴露的数据或方法,两个必须一起使用_

```javascript
import React, { useState, useRef, ChangeEvent, useImperativeHandle } from 'react'
// 父组件
const FatherComponent: React.FC = () => {
    const childRef = useRef(null)
    const handleGetCount = () => {
        console.log(childRef.current)
    }
    return (
        <>
            <h1>这里是Father组件</h1>
            <Child ref={childRef} /> // 这里是子组件内容 ,通过ref获取子组件的内容
            <button onClick={handleGetCount}>获取子组件count值</button>
        </>
    )
}

// 子组件
/**
 * 如果 在父组件中使用了ref来获取子组件 , 普通的函数组件时获取不到的,因为无法获取到实例
 * const Child:React.FC =()=>{<></>} 比如这样写,就会报错
 * 为了获取到子组件的内容需要使用 React.forwardRef 这个方法 包裹对应的函数组件
 *  React.forwardRef 接受两个参数,第一个参数是 props 父组件对子组件传递的参数 ,第二个就是ref参数
 *  需要引入 react 的 useImperativeHandle 方法 ,在子组件内自定义要被暴露的数据或方法,两个必须一起使用
 */
const Child = React.forwardRef((props, ref) => {
    const [count, setCount] = useState('')
    const handleChangeCount = (e: ChangeEvent) => {
        console.log(e)
        setCount((e.target as HTMLInputElement).value)
    }
    useImperativeHandle(ref, () => {
        return {
            count,
            setCount
        }
    })
    return (
        <>
            <input value={count} onChange={handleChangeCount}></input>
        </>
    )
})
```

### useImperativeHandle 的参数

-   第一个参数是父组件传递的 ref
-   第二个参数是一个函数,返回的对象会自动绑定到 ref 上,子组件可以将自己内部的数据或方法通过 `useImperativeHandle` 添加到父组件中 `useRef` 定义的对象中
-   第三个参数是函数依赖的值 (可选),若 `createHandle` 函数中使用到了子组件内部定义的变量,则还需要将变量作为依赖变量 ,成为 `useImperativeHandle` 的第三个参数

**第三个参数 如果传`[]`空数组,代表没有依赖,useImperativeHandle 的第二个参数暴露的内容只会在初始化的时候执行一次,后续即使数据更新,暴露的内容也不会变更**

**如果 第三个参数传一个依赖项数组,当数组中有数据发生变化时,第二个参数就会执行一次,更新暴露内容**

**如果省略第三个参数,则在子组件中有任何一个 useState 的数据发生变化时都会重新执行第二个参数传入的方法,更新暴露内容**

## useEffect 副作用函数

**函数的副作用:**

-   就是函数除了返回值以为,对**外界环境**造成的其他影响,即与组件渲染无关的操作,如获取数据,监听事件,更新全局数据扽.

-   useEffect 是 React 中的 hooksAPI ,通过 useEffect 可以执行一些副作用操作.例如 **请求数据,事件监听**

```javascript
useEffect(fn,deps?)
// 第一个参数fn,是一个副作用函数,该函数会在每次渲染完成后被调用
// 第二个参数是一个依赖项数组，这个数组中每一项都会做渲染前后对比
// 如果有任一依赖项发生变化都会重新执行fn函数，如果没有依赖项发生变化则不执行
```

### useEffect 的执行时机

-   **如果不传第二个参数，则 useEffect 会在每次重新渲染后执行**
-   **如果在第二个参数中传依赖性数组，不是空数组的话，会在组件每次渲染完成之后判断 依赖项是否发生变化，如果发生变化再执行副作用函数，_useRef 的数据改变时不会触发_**
-   **如果第二个参数传空数组，副作用函数只会在首次渲染完成后执行一次，当组件重新渲染时也不会执行**

### uesEffect 的注意事项

> 1.尽量不要再副作用函数中改变依赖项的值，否则会造成死循环

> 2.多个不同功能的副作用函数需要分开写，不要写在一个 useEffect 当中

### 如何清理副作用

**useEffect**的 fn 参数可以返回一个函数，用来清理副作用

-   这个 return 的清理函数不需要自己调用，react 会自动调用它
-   当组件被卸载的时候会调用
-   当触发了副作用函数执行的时候，react 会先看 副作用函数有没有 return ，如果有会先执行 return 里的函数，再执行副作用函数

#### 需要清除操作的示例

-   组件中发送请求，当请求还没有回来的时候卸载组件，需要清除请求发起
-   当 dom 上有事件监听，当 dom 被移除的时候关闭事件监听

```js
useEffect(() => {
    return () => {
        /**在这里执行清理操作 */
    }
}, [...依赖])
```

### 移除发送请求示例

**AbortController 是一个 JavaScript 的内置对象，它允许你对尚未完成的异步任务（如 fetch 请求）进行中止操作**

```js
import React, { useState, useEffect, useRef } from 'react'
const Child: React.FC = () => {
    const [color, setColor] = useState('')
    useEffect(() => {
        const controller = new AbortController()
        // AbortController 的示例有两个内容， signal 用来确定是否终止发送请求，在fetch 的配置中传递
        fetch('http://rap2api.taobao.org/app/mock/data/2489331', {
            signal: controller.signal,
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setColor(res.color)
            })
            .catch(err => {
                console.log(err)
            })
        // abort 是一个方法，执行终止请求操作
        return () => controller.abort()
    }, [])
    return (
        <>
            <div>color is {color}</div>
        </>
    )
}
```

### 卸载组件时移除绑定事件示例

```js
const MouseComponent: React.FC = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    })
    // 可以对鼠标今天进行限制处理

    useEffect(() => {
        let timerId: null | NodeJS.Timeout = null
        const mouseHandler = e => {
            if (timerId !== null) return
            timerId = setTimeout(() => {
                console.log(e)
                setPosition({
                    x: e.clientX,
                    y: e.clientY,
                })
                timerId = null
            }, 500)
        }
        window.addEventListener('mousemove', mouseHandler)
        return () => window.removeEventListener('mousemove', mouseHandler) // 当组件被隐藏时，移除事件监听
    }, [])
    return (
        <>
            <br></br>
            鼠标位置为 x:{position.x}
            <br></br>
            鼠标位置为 y:{position.y}
        </>
    )
}
```
