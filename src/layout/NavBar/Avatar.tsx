import { defineComponent } from 'vue'
import {
  ElAvatar,
  ElTooltip,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon
} from 'element-plus'
import { SwitchButton, User } from '@element-plus/icons-vue'
import { useStates, useActions } from '@/use/useVuexMap'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Avatar',
  setup () {
    const router = useRouter()
    const { userInfo } = useStates('user', ['userInfo'])
    const { logout } = useActions('user', ['logout'])

    const handlerCommand = async (command: string | number | object) => {
      if (command === 'logout') {
        await logout()
        router.push({ name: 'login' })
        return
      }
      if (command === 'user') {
        router.push({ name: 'user' })
      }
    }

    return () => {
      const user = userInfo.value
      return (
        <div class="layout-avatar">
          <ElTooltip
            content={user?.nick}
            placement="bottom"
          >
            <span class="layout-avatar__name">{ user?.nick }</span>
          </ElTooltip>
          <ElDropdown
            placement="bottom"
            onCommand={handlerCommand}
            v-slots={{
              dropdown: () => (
                <ElDropdownMenu>
                  <ElDropdownItem
                    command="user"
                  >
                    <ElIcon><User></User></ElIcon>
                    <span>个人中心</span>
                  </ElDropdownItem>
                  <ElDropdownItem
                    command="logout"
                    divided
                  >
                    <ElIcon><SwitchButton></SwitchButton></ElIcon>
                    <span>退出登录</span>
                  </ElDropdownItem>
                </ElDropdownMenu>
              )
            }}
          >
            <ElAvatar
              size={30}
            ></ElAvatar>
          </ElDropdown>
      </div>
      )
    }
  }
})
