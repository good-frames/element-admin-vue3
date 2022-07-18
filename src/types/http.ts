export type HttpRequest = {
  url: string
  method: 'get'|'post'|'delete'|'put'
  data?: any
  params?: any
  errorShowMessage?: boolean
}
