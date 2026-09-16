<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-for="(d, index) in paths" :key="index" :d="d" />
  </svg>
</template>

<script>
// Iconos del design system — trazo de 24x24, sin dependencias externas.
// Todos se dibujan solo con <path> para que hereden color y grosor.
const ICONS = {
  plus: ['M12 5v14', 'M5 12h14'],
  check: ['M5 13l4 4L19 7'],
  clock: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0', 'M12 7v5l3.5 2'],
  edit: ['M4 20h4L18.5 9.5a2.12 2.12 0 0 0-3-3L5 17v3z', 'M14.5 7.5l2 2'],
  trash: ['M4 7h16', 'M9 7V4h6v3', 'M6 7l1 13h10l1-13', 'M10 11v6', 'M14 11v6'],
  logout: ['M15 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10', 'M11 12h9', 'M17 8l4 4-4 4'],
  user: ['M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0', 'M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5'],
  list: ['M9 6h11', 'M9 12h11', 'M9 18h11', 'M4.5 6h.01', 'M4.5 12h.01', 'M4.5 18h.01'],
  clipboard: [
    'M9 4h6v3H9z',
    'M9 5.5H7a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6.5a1 1 0 0 0-1-1h-2',
    'M9.5 12h5',
    'M9.5 16h3'
  ],
  alert: ['M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0', 'M12 7.5v5', 'M12 16h.01'],
  refresh: ['M20.5 12a8.5 8.5 0 1 1-2.5-6', 'M20.5 4v4.5H16'],
  wifiOff: ['M12 19h.01', 'M8.5 15.5a5 5 0 0 1 7 0', 'M5 12a10 10 0 0 1 14 0', 'M3 3l18 18'],
  close: ['M6 6l12 12', 'M18 6L6 18']
}

export default {
  name: 'AppIcon',
  props: {
    name: {
      type: String,
      required: true,
      validator: (value) => Object.prototype.hasOwnProperty.call(ICONS, value)
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  computed: {
    paths() {
      return ICONS[this.name] || []
    }
  }
}
</script>
