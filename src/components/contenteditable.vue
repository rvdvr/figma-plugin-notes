<template>
  <div contenteditable="true" 
    @input="update"
    @blur="save"
    v-on:keyup.ctrl.13="enter"
    v-on:keyup.esc="enter"
    v-on:keyup.ctrl.67="togglecheck"></div>
</template>

<script>
export default {
  props:['typeInput', 'content', 'currentIndex'],
  mounted() {
    this.$el.innerText = this.content;
  },
  methods:{
    enter(event) {
      event.target.blur();
    },
    togglecheck() {
      this.$emit('checkmode', this.currentIndex);
    },
    update(event){
      this.$emit('update',event.target.innerText);
    },
    save(event) {
      if (event.target.innerText === '') {
        this.$emit('remove', this.currentIndex);
      }

      if (this.typeInput === 'newTask') {
        this.$el.innerText = null;
        this.$emit('new');
      } else {
        this.$emit('save');
      }

    }
  }
}
</script>

<style>

</style>