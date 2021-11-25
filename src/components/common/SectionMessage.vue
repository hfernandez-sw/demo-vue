<template>
  <div class="sectionMessage" :class="[type, addPosition]">
    <i class="sectionMessage-icon icon bhcd-icon-question-mark" v-if="type === 'default'"></i>
    <i class="sectionMessage-icon icon bhcd-icon-alert-triangle" v-if="type === 'danger'"></i>
    <i class="sectionMessage-icon icon bhcd-icon-info" v-if="type === 'info'"></i>
    <i class="sectionMessage-icon icon bhcd-icon-checkmark-circle" v-if="type === 'success'"></i>
    <div>
      <h3 class="sectionMessage-title">{{ titleMessage }}</h3>
      <p class="sectionMessage-text" v-if="textMessage">{{ textMessage }}</p>
      <div class="sectionMessage-actionsContent">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titleMessage: {
      type: String,
      required: true
    },
    textMessage: {
      type: String
    },
    type: {
      type: String,
      default: 'default',
      required: true
    },
    addPosition: {
      type: String
    }
  }
};
</script>
