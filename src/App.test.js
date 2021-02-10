import SamuraiJSApp from './App'
import ReactDOM from 'react-dom'

test('Рендер компоненты в теге div', () => {
    const div = document.createElement('div')
    ReactDOM.render(<SamuraiJSApp />, div)
    ReactDOM.unmountComponentAtNode(div)
})
