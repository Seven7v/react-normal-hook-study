import React, { useState, useEffect, useLayoutEffect } from 'react'

const LayoutEffect: React.FC = () => {
    const [num, setNum] = useState(Math.random() * 200)
    // 这里设置为0 后使用useEffect 判断条件再设置为随机数 会有闪烁问题，
    // 因为useEffect实在页面渲染完成后执行，
    // 依赖项变化后会重新再渲染。 为了不闪烁可以使用useLayoutEffect
    // useEffect(() => {
    //     if (num === 0) {
    //         setNum(Math.random() * 200)
    //     }
    // }, [num])

    useLayoutEffect(() => {
        if (num === 0) {
            setNum(Math.random() * 200)
        }
    }, [num])
    return (
        <>
            <div>num 的值是 {num}</div>
            <button onClick={() => setNum(0)}>更改num</button>
        </>
    )
}

export default LayoutEffect
