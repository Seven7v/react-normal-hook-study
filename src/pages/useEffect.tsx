import React, { useState, useEffect, useRef } from 'react'
import useMousePosition from '@/hoosk/useMousePosition'
import useCountDown from '@/hoosk/useCountDown'
const Child: React.FC = () => {
    const [color, setColor] = useState('')
    useEffect(() => {
        const controller = new AbortController()
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
        return () => controller.abort()
    }, [])
    return (
        <>
            <div>color is {color}</div>
        </>
    )
}
const MouseComponent: React.FC = () => {
    const position = useMousePosition(200)
    return (
        <>
            <br></br>
            鼠标位置为 x:{position.x}
            <br></br>
            鼠标位置为 y:{position.y}
        </>
    )
}
const PageCountDown: React.FC = () => {
    const time = useCountDown(10)

    return (
        <>
            <button disabled={time > 0}>确认签署协议{time > 0 && <span>({time})</span>}</button>
        </>
    )
}
const Effect: React.FC = () => {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('')
    const [showMouse, setShowMouse] = useState(true)
    // 展示或隐藏子组件
    const [show, setShow] = useState(true)
    const handleChangeCount = () => {
        setCount(prev => prev + 1)
    }
    const handleChangeName = () => {
        setName('张三')
    }
    const state = useRef(0)
    const handleChangeStata = () => {
        state.current = state.current + 1
    }
    useEffect(() => {
        console.log('这里是useEffect')
        console.log(count)
        console.log(name)
        console.log(state.current)
    }, [])
    return (
        <>
            <div>
                名字是{name}，分数是{count}
            </div>
            <button onClick={handleChangeCount}>更改分数</button>
            <button onClick={handleChangeName}>更改名字</button>
            <button onClick={handleChangeStata}>更改state</button>
            <button onClick={() => setShow(!show)}>显示组件</button>
            {show && <Child />}

            {/* <button onClick={() => setShowMouse(!showMouse)}>显示鼠标位置</button>
            {showMouse && <MouseComponent />} */}

            <PageCountDown />
        </>
    )
}

export default Effect
