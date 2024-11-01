import React from 'react'
import { useState, useEffect } from 'react'

export const BaseUseState: React.FC = () => {
    const [count, setCount] = useState(0)
    const [user, setUser] = useState({
        name: 'jett',
        age: '18',
        country: 'kora'
    })
    // 模拟组件强制刷新
    const [, fourceUpdate] = useState({})
    const refresh = () => {
        fourceUpdate({})
    }
    const add = () => {
        // setCount(count + 1)
        setCount(count + 1)
        // set函数修改数值的方法是异步的，所以修改后不能立刻打印出修改后的结果
        // 所以连续执行两次这个方法，在执行第二次 的时候count还是 初始值 0 结果为1
        // 如果要想执行两次，可以想set函数传递 回调的方式解决
        setCount(prev => prev + 1)
    }
    const changeUser = () => {
        user.name = 'gaiko'
        user.age = 16
        setUser({ ...user })
    }
    // 如果在set函数执行后想要立刻查看结果，可以使用useEffect函数，监听到状态变化是进行处理，
    // useEffect 接受两个参数 第一个参数是回调函数，第二个参数是一个数组，数组里写入监听的参数
    useEffect(() => {
        console.log(count)
    }, [count])
    return (
        <>
            <div>
                <p>这里是count数值{count}</p>
                <button onClick={add}>点击count+1</button>
                {/* 更改对象 */}
                <p>用户名：{user.name}</p>
                <p>年龄：{user.age}</p>
                <p>国家：{user.country}</p>
                <button onClick={changeUser}>点击更改 用户 </button>
                {/* 模拟组件强制刷新 */}
                <p>当前时间 {Date.now()}</p>
                <button onClick={refresh}>点击更改 用户 </button>
            </div>
        </>
    )
}
