import { useState, useEffect } from 'react'

// 自己封装的hooks都要以use开头

const useMousePosition = (delay = 0) => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    })
    // 对鼠标监听进行节流操作 写在外面或者 useEffect里面都可以

    let timerId: null | NodeJS.Timeout = null
    const mouseHandler = e => {
        if (timerId !== null) return
        timerId = setTimeout(() => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            })
            console.log(timerId)
            timerId = null
        }, delay)
    }

    useEffect(() => {
        window.addEventListener('mousemove', mouseHandler)
        return () => window.removeEventListener('mousemove', mouseHandler)
    }, [])

    return position
}

export default useMousePosition
