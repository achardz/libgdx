export default function ({ route, redirect }) {
  if (route.fullPath === '/' || route.fullPath === '' || route.fullPath === '/dash-board/item-store') {
    return redirect('/shop')
  }
}
