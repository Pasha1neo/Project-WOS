import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

describe('ProfileStatus component', () => {
    test('status from props', () => {
        const component = create(<ProfileStatus status='it-kamasutra.com' />)
        const instance = component.getInstance()
        expect(instance.state.status).toBe('it-kamasutra.com')
    })
    test('after creation span should be displayed', () => {
        const component = create(<ProfileStatus status='it-kamasutra.com' />)
        const root = component.root
        let span = root.findByType('span')
        expect(span).toBe(1)
    })
    test('span = it-kamasutra.com', () => {
        const component = create(<ProfileStatus status='it-kamasutra.com' />)
        const root = component.root
        let span = root.findByType('span')
        expect(span.children[0]).toBe('it-kamasutra.com')
    })
})
