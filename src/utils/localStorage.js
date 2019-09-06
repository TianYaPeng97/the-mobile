
// 设置本地存储数据
export const setItem = (key,item)=>{
    return window.localStorage.setItem('key',JSON.stringify(item))
}


// 取出本地存储数据
export const getItem = (key) => {
    return JSON.parse(window.localStorage.getItem(key))
}

// 移除本地存储
export const removeItem = (key) => {
    window.localStorage.removeItem(key)
}
