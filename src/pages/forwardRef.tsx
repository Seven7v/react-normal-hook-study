import React, { useState, useRef, ChangeEvent, useImperativeHandle } from 'react'

const FatherComponent: React.FC = () => {
    const childRef = useRef(null)
    const handleGetCount = () => {
        console.log(childRef.current)
    }
    const handleAdd = () => {
        childRef.current.setCount(pre => Number(pre) + 1)
    }
    return (
        <>
            <h1>这里是Father组件</h1>
            <Child ref={childRef} />
            <button onClick={handleGetCount}>获取子组件count值</button>
            <button onClick={handleAdd}>count+1</button>
        </>
    )
}
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
    useImperativeHandle(
        ref,
        () => {
            console.log('执行了')

            return {
                count,
                setCount,
                reset: () => setCount('')
            }
        },
        [count]
    )
    return (
        <>
            <input value={count} onChange={handleChangeCount}></input>
        </>
    )
})
export default FatherComponent
