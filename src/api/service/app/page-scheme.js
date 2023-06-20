// import { menuService } from './menu'

class PageSchemeService {
  info({ id }) {
    console.log(id);
    return new Promise((resolve, reject) => {
      import(`@/manager-schemes/${id}.json`)
        .then((res) => {
          resolve({ data: res });
        })
        .catch((err) => ({ data: undefined }));
    });
  }
}

export const pageSchemeService = new PageSchemeService();
