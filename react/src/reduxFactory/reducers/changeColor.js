import { setColor, CHANGE_COLOR} from '../actions/setColor';

export default function changeColor(state = null, action) {
  if(!state) {
    return {
      themeColor: 'red'
    }
  }
  switch(action.type){
    case CHANGE_COLOR:
      return {
        ...state, themeColor: action.themeColor
      }
    default:
      return state;
  }
}