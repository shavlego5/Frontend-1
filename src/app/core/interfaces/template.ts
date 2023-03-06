export interface ITemplate {
  name: string | null,
  description: string | null,
  createdAt: string,
  updatedAt: string | boolean,
  handlebars: string,
  json: string
}
