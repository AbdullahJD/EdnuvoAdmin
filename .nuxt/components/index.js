export const FullProjectOffer = () => import('../..\\components\\fullProjectOffer.vue' /* webpackChunkName: "components/full-project-offer" */).then(c => wrapFunctional(c.default || c))
export const HourProjectOffer = () => import('../..\\components\\hourProjectOffer.vue' /* webpackChunkName: "components/hour-project-offer" */).then(c => wrapFunctional(c.default || c))
export const PhaseProjectOffer = () => import('../..\\components\\phaseProjectOffer.vue' /* webpackChunkName: "components/phase-project-offer" */).then(c => wrapFunctional(c.default || c))
export const Search = () => import('../..\\components\\search.vue' /* webpackChunkName: "components/search" */).then(c => wrapFunctional(c.default || c))
export const Stats = () => import('../..\\components\\stats.vue' /* webpackChunkName: "components/stats" */).then(c => wrapFunctional(c.default || c))

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
