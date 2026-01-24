import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

const RouterViewStub = {
  name: 'RouterView',
  template: '<div data-test="router-view" />',
}

describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: RouterViewStub,
        },
      },
    })
    expect(wrapper.find('[data-test="router-view"]').exists()).toBe(true)
  })
})
