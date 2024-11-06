// import React, { useReducer } from 'react'

// // useReducer需要传递初始值，和reducer函数

// const initState = {
//     name: 'KID.',
//     age: 12.5,
// }
// type Chlid = typeof initState
// // 需要给action增加类型，指定type 的固定值，这样 传数据和 处理方法时都会有提示
// type ActionType = { type: 'UPDATE_NAME' | 'UPDATE_AGE'; payload: string }
// const reducer = (prev: Chlid, action: ActionType) => {
//     console.log('进入了redecer函数')
//     console.log(action)
//     const { type, payload } = action
//     // 这里用switch 会好一些，因为可能有很多不一样的操作类型
//     // let newVal = { ...prev }
//     // if (type === 'UPDATE_NAME') {
//     //     newVal.name = payload
//     // }
//     // if (type === 'UPDATE_AGE') {
//     //     newVal.age = payload
//     // }
//     // return newVal
//     switch (action.type) {
//         case 'UPDATE_NAME':
//             return { ...prev, name: payload }
//         case 'UPDATE_AGE':
//             return { ...prev, age: payload }
//         default:
//             return prev
//     }
// }
// const initAction = (state: Chlid) => {
//     return {
//         ...state,
//         age: Math.round(Math.abs(state.age) || 18),
//     }
// }

// // 通过一个父子组件来学习reducer
// const UseReducer: React.FC = () => {
//     const [person, setPerson] = useReducer(reducer, initState, initAction)
//     console.log(person)
//     // 在修改 userReducer得到的数据时，如果直接通过，person.name 进行赋值，值时可以修改的，
//     // 但是不会触发页面渲染
//     // 如果想要触发页面重新渲染，需要触发reducer来修改目标内容。
//     // 这是就需要数组中的第二个元素来触发reducer
//     const handleChangeName = () => {
//         setPerson({
//             type: 'UPDATE_NAME',
//             payload: 'zhangshan',
//         })
//     }
//     const handleChangeAge = () => {
//         setPerson({
//             type: 'UPDATE_AGE',
//             payload: '13',
//         })
//     }
//     return (
//         <div>
//             <p>名字：{person.name}</p>
//             <p>年龄：{person.age}</p>
//             <button onClick={handleChangeName}>修改名字</button>
//             <button onClick={handleChangeAge}>修改年龄</button>
//             <div className="father">
//                 <Child1 />
//                 <Child2 />
//             </div>
//         </div>
//     )
// }

// export default UseReducer

// // 子组件1
// const Child1: React.FC = () => {
//     return <div className="child1">Child1</div>
// }
// const Child2: React.FC = () => {
//     return <div className="child2">Child2</div>
// }
