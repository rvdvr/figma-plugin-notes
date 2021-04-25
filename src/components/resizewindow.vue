<template>
  <div>
    <button v-if="fullView" @click="hideWindow">Свернуть</button>
    <button v-else @click="showWindow">Развернуть</button>
  </div>
</template>

<script>
import { dispatch, handleEvent } from "../uiMessageHandler";

export default {
  data() {
    return {
      fullView: true
    }
  },
  methods: {
    toggleSizeWindow() {
      this.fullView = !this.fullView;
    },
    hideWindow() {
      this.toggleSizeWindow();
      dispatch('hideWindow')
    },
    showWindow() {
      this.toggleSizeWindow()
      dispatch('showWindow')
    }
  }
}
</script>

<style>

</style>