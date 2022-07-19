import { ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

export function useForm (form: object, rules: any) {
  const formRef = ref<FormInstance>()
  const formRules = ref<FormRules>(rules)
  const formData = ref(form)

  const validate = async () => {
    await formRef.value?.validate()
    return true
  }

  return {
    formRef,
    formData,
    formRules,
    validate
  } as const
}
