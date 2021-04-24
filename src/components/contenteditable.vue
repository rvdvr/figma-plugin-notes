<template>
  <div contenteditable="true" 
    @input="update"
    @blur="save"></div>
</template>

<script>
export default {
  props:['content', 'currentIndex'],
  mounted(){
    this.$el.innerText = this.content;
  },
  methods:{
    update(event){
      this.$emit('update',event.target.innerText);

    },
    save(event) {
      if (event.target.innerText === '') {
        this.$emit('remove', this.currentIndex);
      }

      this.$emit('save');
    }
  }
}
</script>

<style>

</style>