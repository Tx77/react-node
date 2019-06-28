import { setUserName } from '../actions/systemConstant'

function setSystemConstant (state , action) {
  if (!state) {
    return {
      username: ''
    }
  }
  console.log(state)
  switch (action.type) {
    case 'USER_NAME':
      return Object.assign({}, state, {
        username: action.username
      })
  }
}

export default setSystemConstant
