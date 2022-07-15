import { defineComponent } from 'vue'

// import { useStates } from '@/use/useVuexMap'

import NavBar from './NavBar'
import SideBar from './SideBar'
import TabBar from './TabBar'
import Main from './Main.vue'

import './styles/index.styl'

export default defineComponent({
  name: 'layout-main',
  setup () {
    return () => {
      return (
        <div class="layout-main">
          <SideBar class="layout-menus"></SideBar>
          <div class="layout-main__right">
            <NavBar></NavBar>
            <TabBar></TabBar>
            {/* <div style="height: 60px"></div> */}
            <Main class="layout-view"></Main>
          </div>
        </div>
      )
    }
  }
})
