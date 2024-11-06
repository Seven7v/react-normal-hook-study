import React from 'react'
import { useState, useEffect } from 'react'
// 这里引入的组件需要时大驼峰
import { BaseUseState } from '@/pages/useState'
import BaseUseRef from '@/pages/useRef'
import ForwardRef from '@/pages/forwardRef'
import Effect from '@/pages/useEffect'
import LayoutEffect from '@/pages/useLayoutEffect'
import UseReducer from '@/pages/useReducer'

// React.FC<T> 表示这是一个函数式的react组件
const App: React.FC = () => {
    const [date, setDate] = useState(() => {
        const dt = new Date()
        return {
            year: dt.getFullYear(),
            month: dt.getMonth() + 1,
            day: dt.getDate(),
        }
    })
    return (
        <>
            <h1>这里是手写的一个app组件</h1>
            <div>
                {date.year}年{date.month}月{date.day}日
            </div>
            <BaseUseState />
            <BaseUseRef />
            <ForwardRef />
            <Effect />
            <LayoutEffect />
            <br />
            <UseReducer />
        </>
    )
}

export default App
