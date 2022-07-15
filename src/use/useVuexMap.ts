import { computed } from 'vue'
import { useStore, mapState, mapGetters, createNamespacedHelpers, mapMutations, mapActions } from 'vuex'

type Mapper = string | Array<string> | {[key: string]: any }

/**
 * 获取state
 * @param moduleName 模块名
 * @param mapper 想要获取的state
 * @returns state
 */
export function useStates (moduleName: string | Mapper, mapper?: Mapper) {
  let mapperFn = mapState // 默认等于mapState
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState
  }
  return useMapper(mapper || moduleName, mapperFn)
}

/**
 * 获取getter
 * @param moduleName 模块名
 * @param mapper 想要获取的getter
 * @returns getter
 */
export function useGetters (moduleName: string | Mapper, mapper?: Mapper) {
  let mapperFn = mapGetters // 默认等于mapGetters
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters
  }
  return useMapper(mapper || moduleName, mapperFn)
}

/**
 * 获取mutations
 * @param moduleName 模块名
 * @param mapper 想要获取的mutations
 * @returns mutations
 */
export function useMutations (moduleName: string | Mapper, mapper?: Mapper) {
  let mapperFn = mapMutations
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapMutations
  }

  return useMapper(mapper || moduleName, mapperFn, false)
}

/**
 * 获取actions
 * @param moduleName 模块名
 * @param mapper 想要获取的actions
 * @returns actions
 */
export function useActions (moduleName: string | Mapper, mapper?: Mapper) {
  let mapperFn = mapActions
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapActions
  }

  return useMapper(mapper || moduleName, mapperFn, false)
}

function useMapper (mapper: Mapper, mapFn: any, isComputed = true) {
  // mapFn对应想使用的函数
  const storeStateFns = mapFn(mapper)

  const store = useStore()
  const storeObj: {
    [key: string]: any
  } = {}
  Object.keys(storeStateFns).forEach(fnnKey => {
    const fn = storeStateFns[fnnKey].bind({ $store: store })
    if (isComputed) {
      storeObj[fnnKey] = computed(fn)
    } else {
      storeObj[fnnKey] = fn
    }
  })

  return storeObj
}
