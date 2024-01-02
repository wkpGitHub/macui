// import { menuService } from './menu'

class PageSchemaService {
  info ({ id }) {
    console.log(id)
    return new Promise((resolve, reject) => {
      import(`@lc/manager-schemas/${id}.json`)
        .then((res) => {
          resolve({ data: res })
        })
        .catch((err) => ({ data: undefined }))
    })
  }
}

export const pageSchemaService = new PageSchemaService()
