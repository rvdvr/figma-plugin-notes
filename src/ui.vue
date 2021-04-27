<template>
  <div>
    <!-- <ResizeWindow /> -->
    <div class="notes">
      <draggable group="tasks" @start="drag=true" @end="drag=false">
        <div class="notes__item" v-for="(task, index) in tasks" :key="task.id">
          <label class="notes__check"
            v-if='task.checkMode'>
            <span class="notes__check-icon">
              <svg v-if='!task.done' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 11.9999C9.53757 11.9999 12 9.53744 12 6.49988C12 3.46231 9.53757 0.999878 6.5 0.999878C3.46243 0.999878 1 3.46231 1 6.49988C1 9.53744 3.46243 11.9999 6.5 11.9999ZM6.5 12.9999C10.0899 12.9999 13 10.0897 13 6.49988C13 2.91003 10.0899 -0.00012207 6.5 -0.00012207C2.91015 -0.00012207 0 2.91003 0 6.49988C0 10.0897 2.91015 12.9999 6.5 12.9999Z" fill="black" fill-opacity="0.8"/>
              </svg>
              <svg v-if='task.done' width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 12.9999C10.0899 12.9999 13 10.0897 13 6.49988C13 2.91003 10.0899 -0.00012207 6.5 -0.00012207C2.91015 -0.00012207 0 2.91003 0 6.49988C0 10.0897 2.91015 12.9999 6.5 12.9999ZM6.50482 8.89653L9.75482 5.24038L8.93268 4.50957L6.0702 7.72978L4.04515 5.70481L3.26735 6.48264L5.70485 8.92004L6.1173 9.33248L6.50482 8.89653Z" fill="black" fill-opacity="0.8"/>
              </svg>
            </span>
            <input type="checkbox"
              v-if='task.checkMode'
              v-model="task.done"
              @change="updateStorage">
          </label>

          <Editable 
            v-if="!task.inputMode"
            :class="{done: task.done}"
            :content="task.text"
            :currentIndex="index"
            @update="task.text = $event" 
            @save="updateStorage"
            @remove="removeTask"
            @checkmode="toggleCheckbox"/>
        </div>
      </draggable>
    </div>

    <div class="add-task">

      <Editable 
          class="add-task__input" 
          :typeInput="'newTask'"
          :content="newTask"
          @update="newTask = $event" 
          @new="addTask"/>

    </div>
  </div>
</template>

<script>
import { dispatch, handleEvent } from "./uiMessageHandler";
import Editable from "./components/contenteditable.vue";
import ResizeWindow from "./components/resizewindow.vue";

import draggable from 'vuedraggable';

// Add these lines to import the interactive figma-ui components as needed.
import "./figma-ui/js/selectMenu";
import "./figma-ui/js/iconInput";
import "./figma-ui/js/disclosure";

export default {
  data() {
    return {
      // editableStatus: false,
      newTask: null,
      tasks: [],
    };
  },
  components: {
    Editable,
    draggable,
    ResizeWindow
  },
  mounted() {
    handleEvent("sendChangedStorage", tasks => {
      this.tasks = tasks;
    });
  },
  computed: {

  },
  methods: {
    toggleCheckbox(index) {
      this.tasks[index].checkMode = !this.tasks[index].checkMode; 
    },
    contentEdit(value, index) {
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
            checkMode: false, 
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
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

body {
  margin: 0;
  padding-right: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 22px;
}

.notes {
  margin-top: 15px;
}

.notes__item {
  display: flex;
  padding: 7px 20px 10px 16px;
}

.notes__check {
  cursor: pointer;
  position: relative;
  margin-right: 9px;
  padding-top: 4px;

  input {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    opacity: 0;
    z-index: -1;
    overflow: hidden;
  }
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
  color: #CDCBCB;
}
</style>