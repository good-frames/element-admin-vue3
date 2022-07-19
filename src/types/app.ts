export type ViewItem = {
  path: string
  name: string
  meta: {
    title?: string
    affix?: boolean
    [key: string]: any
  } | null
  query: object,
  params: object,
  title: string
}

export type Menus = {
  path?: string
  name: string
  children?: Array<Menus>
  icon?: any
  disabled?: boolean
}
