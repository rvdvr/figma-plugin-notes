<template>
  <div>
    <div class="tasks__list">
      <div class="tasks__item" v-for="(task, index) in tasks" :key="task.index">
        
        <input type="checkbox" v-model="task.done" @change="updadeStorage">
        <span v-if="!task.inputMode" :class="{done: task.done}">{{task.text}}</span>
        <input v-else class="add-task__input" v-model="task.text" v-on:keyup.enter="saveEditedTask(index)">

        <span class="tasks__edit" @click="editTask(index)">⌘</span>
        <span @click="removeTask(index)" class="add-task__remove">—</span>

      </div>
    </div>
    <div class="add-task">
      <input class="add-task__input" v-model="newTask" v-on:keyup.enter="addTask">
      <button class="add-task__btn" @click="addTask">+</button>
    </div>
  </div>
</template>

<script>
import { dispatch, handleEvent } from "./uiMessageHandler";

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
  mounted() {
    handleEvent("sendChangedStorage", tasks => {
      this.tasks = tasks;
    });
  },
  methods: {
    updadeStorage() {
      dispatch('changeStorage', this.tasks);
    },
    addTask() {
      if (this.newTask!==null) {
        this.tasks.push({done: false, inputMode: false, text: `${this.newTask}`});
        
        this.newTask = null;
        this.updadeStorage();
      }
    },
    removeTask(index) {
      this.$delete(this.tasks, index);

      this.updadeStorage();
    },
    editTask(index) {
      this.tasks[index].inputMode = true;
    },
    saveEditedTask(index) {
      this.tasks[index].inputMode = false;

      this.updadeStorage();
    }
  }
};
</script>

<style lang='scss'>
@import "./figma-ui/figma-plugin-ds";

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