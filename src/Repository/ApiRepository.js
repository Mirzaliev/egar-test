import SecuritiesRepository from "./SecuritiesRepository";

const repositories = {
  securities: SecuritiesRepository
};

export default {
  get: name => repositories[name]
};
