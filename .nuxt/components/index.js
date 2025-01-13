export { default as FullProjectOffer } from '../..\\components\\fullProjectOffer.vue'
export { default as HourProjectOffer } from '../..\\components\\hourProjectOffer.vue'
export { default as PhaseProjectOffer } from '../..\\components\\phaseProjectOffer.vue'
export { default as Search } from '../..\\components\\search.vue'
export { default as Stats } from '../..\\components\\stats.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
