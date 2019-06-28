/**
 * 定义系统常量类型
 */

const USER_NAME = 'USER_NAME'

export function setUserName (username) {
  console.log(username)
  return {
    type: USER_NAME,
    username: username
  }
}
