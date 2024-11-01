import React, { useState } from 'react'
import { useRef, useEffect } from 'react'
const BaseUseRef: React.FC = () => {
    // 获取dom元素的时候 需要给useRef 复制为null 且在绑定的元素中增加ref属性
    const inputRef = useRef<HTMLInputElement>(null)

    const handleGetInput = () => {
        inputRef.current?.focus()
    }
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

    const time = useRef(Date.now())
    const handleUpdateTime = () => {
        time.current = Date.now()
        console.log(time.current)
    }
    useEffect(() => {
        console.log('时间变了')
    }, [time.current])

    useEffect(() => {
        console.log('数量变了')
    }, [count])
    return (
        <>
            <div>useRef</div>
            <input type="text" ref={inputRef} />
            <button onClick={handleGetInput}>获取input输入框</button>
            <div>
                现在的count是 {count}，原来的count是 {preCount.current}
                这种方式是错的{prev} 显示不出
            </div>

            <br />
            <div>
                <p>1. useRef 只会在组件首次渲染的时候初始胡, 如果组件被重新渲染,不会执行</p>
                <p>2. ref.current 发生变化时,数据会改变,但是组件不会重新渲染</p>
                <p>
                    3. ref.current无法成为其他hook的依赖,例如useEffect
                    无法监听到ref.current的变化而执行操作
                    <br />
                    但是 当从 state变化时 ,之前的变化 会让useEffect 检测到而执行
                </p>
                <div>
                    数字是{count},时间是{time.current}
                </div>
                <button onClick={handleUpdateTime}> 改变时间 </button>
                <button onClick={handleAddCount}>点击增加count</button>
                <p>
                    <strong>
                        点击count 增加 会更新视图 但是时间不改变
                        点击改变时间,可以打印出时间改变,但是视图不更新
                    </strong>
                </p>
            </div>
        </>
    )
}

export default BaseUseRef
