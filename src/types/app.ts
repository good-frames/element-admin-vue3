export type TabItem = {
  path: string
  name: string
  close?: boolean
}

export type Menus = {
  path?: string
  name: string
  children?: Array<Menus>
  icon?: any
  disabled?: boolean
}
