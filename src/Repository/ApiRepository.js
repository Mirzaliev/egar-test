import SecuritiesRepository from "./SecuritiesRepository";

/**
 * Класс, который собирает все индивидуальные репозитори
 * для удобного использования в любом месте
 * @type {{securities: {get, create, update, delete}}}
 */

const repositories = {
  securities: SecuritiesRepository
};

export default {
  get: name => repositories[name]
};
