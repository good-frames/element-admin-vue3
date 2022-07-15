import { defineComponent } from 'vue'

export default defineComponent({
  name: 'home',
  setup () {
    return () => {
      return (
        <div style="background: #ccc">home</div>
      )
    }
  }
})
