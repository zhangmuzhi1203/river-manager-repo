//登录后通过当前时间推断是早晨上午下午晚上的函数封装
export let getTime = () => {
  //通过内置函数 Date()
  let hour = new Date().getHours()
  let message = ''
  if (hour <= 9) {
    message = '早上'
  } else if (hour <= 12) {
    message = '上午'
  } else if (hour <= 18) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}