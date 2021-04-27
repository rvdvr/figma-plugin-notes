<template>
  <div class="notes__editable"
    :contenteditable="editableStatus" 
    :class="{'notes__editable--new': typeInput === 'newTask'}"
    @input="update"
    @blur="save"
    v-on:keyup.ctrl.13="enter"
    v-on:keyup.esc="enter"
    v-on:keyup.ctrl.67="togglecheck"></div>
</template>

<script>
export default {
  data() {
    return {
      editableStatus: true
    }
  },
  props:['typeInput', 'content', 'currentIndex'],
  mounted() {
    this.$el.innerText = this.content;
  },
  methods:{
    // changeMode(event) {
    //   this.editableStatus = true; 
    //   this.$refs['notes__editable'].focus();
    // },
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

<style lang='scss'>
  .notes__editable {
    width: 100%;
    outline: none;

    &:focus {
      outline: none;
    }

    &--new {
      position: relative;
      padding: 7px 20px 10px 16px;

      &:before {
        content: '> …';
        display: inline-block;
        position: absolute;
        top: 7px;
        left: 16px;
        color: #C4C4C4;
        z-index: -1;
      }

      &:focus {
        &:before {
          display: none;
        }
      }
    }
  }

  .notes__editable[contenteditable="false"] {
      cursor: default;
    }
</style>