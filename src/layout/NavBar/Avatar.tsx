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

export default defineComponent({
  name: 'Avatar',
  setup () {
    return () => {
      return (
        <div class="layout-avatar">
          <ElTooltip
            content="dongdongjie"
            placement="bottom"
          >
            <span class="layout-avatar__name">dongdongjie</span>
          </ElTooltip>
          <ElDropdown
            placement="bottom"
            v-slots={{
              dropdown: () => (
                <ElDropdownMenu>
                  <ElDropdownItem>
                    <ElIcon><User></User></ElIcon>
                    <span>个人中心</span>
                  </ElDropdownItem>
                  <ElDropdownItem divided>
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
