const Note = {
  template: `
<form class="ui form">
  <div class="field">
    <label>Text</label>
    <textarea v-model="text"></textarea>
    <!--<input v-model="text"/>-->
  </div>
</form>
  `,

  data() {
    return {text: ''}
  },

  watch: {
    async text(oldVal, newVal) {
      await api('POST', '/api/note', {}, {text: newVal})
      // socket.emit('edit', {text: newVal})
    }
  },

  methods: {
  }
}
