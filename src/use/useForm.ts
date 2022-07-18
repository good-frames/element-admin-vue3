import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

export function useForm (form: object, rules: any) {
  const formRef = ref<FormInstance>()
  const formRules = ref<FormRules>(rules)
  const formData = ref(form)

  return { formRef, formData, formRules } as const
}
