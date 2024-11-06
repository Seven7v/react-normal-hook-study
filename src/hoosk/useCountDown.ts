import { useState, useEffect } from 'react'

const useCountDown = (time = 10) => {
    let num = Math.round(Math.abs(time)) || 10
    let [totalTime, setTotalTime] = useState(num)

    useEffect(() => {
        let timerId = setInterval(() => {
            setTotalTime(prv => {
                if (prv - 1 >= 0) {
                    return prv - 1
                } else {
                    return 0
                }
            })
            if (totalTime === 0) {
                clearInterval(timerId)
            }
        }, 1000)
        return () => {
            if (totalTime === 0) {
                clearInterval(timerId)
            }
        }
    }, [])
    return totalTime
}

export default useCountDown
