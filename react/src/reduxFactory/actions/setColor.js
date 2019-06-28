export const CHANGE_COLOR = 'CHANGE_COLOR'

export default function setColor (color) {
  return {
    type: CHANGE_COLOR,
    themeColor: color
  }
}
