<template>
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="1.8in"
      height="0.9in"
    >
      <defs>
        <filter
          filterUnits="userSpaceOnUse"
          id="Filter_0"
          x="0px"
          y="0px"
          width="182px"
          height="82px"
        >
          <feOffset in="SourceAlpha" dx="1.69" dy="3.625" />
          <feGaussianBlur result="blurOut" stdDeviation="2.449" />
          <feFlood flood-color="rgb(21, 19, 21)" result="floodOut" />
          <feComposite operator="atop" in="floodOut" in2="blurOut" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.26" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="PSgrad_0">
          <stop offset="0%" stop-color="rgb(3,195,199)" stop-opacity="1" />
          <stop offset="100%" stop-color="rgb(27,247,224)" stop-opacity="1" />
        </linearGradient>
      </defs>
      <g filter="url(#Filter_0)">
        <path
          fill-rule="evenodd"
          fill="url(#PSgrad_0)"
          d="M0.000,0.000 L174.000,0.000 L153.000,72.000 L0.000,72.000 L0.000,0.000 Z"
        />
      </g>
      <image x="30" y="20" max-width="100px" />
    </svg>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.main {
  max-width: 100%;
}
</style>
