<template lang="pug">
  v-btn(
    class="btn-basic"
    :input-value="slotData ? slotData.value : false"
    v-bind="slotData ? slotData.attrs : false"
    :color="background"
    :elevation="elevation"
    :height="height"
    :min-width="minWidth ? minWidth : '40px'"
    :max-width="width ? width : ''"
    :style="styleButton"
    :rounded="rounded"
    :outlined="outlined"
    :ripple="ripple"
    :disabled="disabled"
    v-on="slotData ? slotData.on : false"
    @click.stop="$emit('click')"
  )
    slot(name="button-icon-before")
    span(:style="{ fontWeight: textFontWeight, textTransform: textTransform }" v-html="$t(text)")
    slot(name="button-icon-after")
</template>

<script>
export default {
  name: 'ButtonBasic',

  props: {
    slotData: {
      type: Object,
      default: () => {}
    },
    text: {
      type: String,
      default: ''
    },
    textFontWeight: {
      type: String,
      default: '400'
    },
    textTransform: {
      type: String,
      default: 'uppercase'
    },
    textHover: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '16px'
    },
    color: {
      type: String,
      default: 'var(--v-basic_primary-base)'
    },
    height: {
      type: String,
      default: '64px'
    },
    width: {
      type: String,
      default: ''
    },
    minWidth: {
      type: String,
      default: ''
    },
    paddingX: {
      type: String,
      default: ''
    },
    paddingY: {
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: ''
    },
    borderColor: {
      type: String,
      default: ''
    },
    hover: {
      type: String,
      default: ''
    },
    borderRadius: {
      type: String,
      default: '0px'
    },
    borderHeight: {
      type: String,
      default: '2px'
    },
    rounded: {
      type: Boolean,
      default: false
    },
    elevation: {
      type: [String, Number],
      default: ''
    },
    boxShadow: {
      type: String,
      default: ''
    },
    transition: {
      type: String,
      default: '0.2s linear'
    },
    ripple: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    styleButton() {
      return {
        width: this.width ? this.width : '',
        '--padding-x': this.paddingX && !this.width ? this.paddingX : '0',
        '--padding-y': this.paddingY ? this.paddingY : '0px',
        '--color': this.color,
        '--background': this.background,
        '--background-hover': this.hover ? this.hover : this.background,
        '--color-hover-text': this.textHover ? this.textHover : this.color,
        '--border-color': this.outlined ? this.borderColor : '',
        '--border-height': this.outlined ? this.borderHeight : '',
        '--size': this.fontSize,
        '--media': this.media,
        '--border-radius': this.borderRadius,
        '--box-shadow': this.elevation ? 'none' : this.boxShadow
      };
    }
  }
};
</script>

<style lang="sass" scoped>
.v-btn.v-size--default
  font-size: var(--size)

.btn-basic.theme--light.v-btn
  transition: 0.2s linear
  border: var(--border-height) solid var(--border-color)
  border-radius: var(--border-radius)
  box-shadow: var(--box-shadow)
  padding: var(--padding-y) var(--padding-x)
  background-color: var(--background)

  span
    color: var(--color)

  &:hover
    background-color: var(--background-hover) !important
    transition: 0.2s linear
    color: var(--color-hover-text)

    .btn-basic.theme--light.v-btn span
      color: var(--color-hover-text)
</style>
