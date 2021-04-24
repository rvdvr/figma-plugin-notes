<template>
  <div>
    <div class="tasks__list">
      <div class="tasks__item" v-for="(task, index) in tasks" :key="task.id">
        
        <input type="checkbox" 
          v-model="task.done" 
          @change="updateStorage"
        >

        <Editable 
          v-if="!task.inputMode" 
          :class="{done: task.done}"
          :content="task.text"
          :currentIndex="index"
          @update="task.text = $event" 
          @save="updateStorage"
          @remove="removeTask"/>

        <span @click="removeTask(index)" class="add-task__remove">–</span>
      </div>
    </div>

    <div class="add-task">

      <Editable 
          class="add-task__input" 
          :typeInput="'newTask'"
          :content="newTask"
          @update="newTask = $event" 
          @new="addTask"/>

      <!-- <input class="add-task__input" v-model="newTask" v-on:keyup.enter="addTask"> -->
      <!-- <button class="add-task__btn" @click="addTask">+</button> -->
    </div>
  </div>
</template>

<script>
import { dispatch, handleEvent } from "./uiMessageHandler";
import Editable from "./components/contenteditable.vue";

// Add these lines to import the interactive figma-ui components as needed.
import "./figma-ui/js/selectMenu";
import "./figma-ui/js/iconInput";
import "./figma-ui/js/disclosure";

export default {
  data() {
    return {
      newTask: null,
      tasks: [],
    };
  },
  components: {
    Editable
  },
  mounted() {
    handleEvent("sendChangedStorage", tasks => {
      this.tasks = tasks;
    });
  },
  computed: {

  },
  methods: {
    contentEdit(value, index) {
      // const value = e.target.innerText
      this.tasks[index] = value.innerText; 
    },
    endEdit(){
      this.$el.querySelector('.contenteditable').blur()
    },

    resizeUI() {
      dispatch('resizeUI')
    },
    updateStorage() {
      dispatch('changeStorage', this.tasks);
    },
    addTask() {
      if (this.newTask!==null) {
        this.tasks.push(
          {
            id: Date.parse(new Date()),
            done: false, 
            inputMode: false, 
            text: `${this.newTask}`
          }
        );
        
        this.newTask = null;
        this.updateStorage();
      }
    },
    removeTask(index) {
      this.$delete(this.tasks, index);

      this.updateStorage();
    },
    editTask(index) {
      this.tasks[index].inputMode = true;
    },
    saveEditedTask(index) {
      this.tasks[index].inputMode = false;

      this.updateStorage();
    }
  }
};
</script>

<style lang='scss'>
@import "./figma-ui/figma-plugin-ds";

.add-task__input {
  border-bottom: 1px solid rgb(161, 161, 161);
}

.tasks__edit {
  margin-right: 10px;
  cursor: pointer;
}

.add-task__remove {
  cursor: pointer;
}

.done {
  text-decoration: line-through;
  color: rgb(168, 168, 168);
}
</style>