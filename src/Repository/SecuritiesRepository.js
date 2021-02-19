import Client from "../plugins/axios";
const resource = "/securities.json?print=pretty";

export default {
  get() {
    return Client.get(`${resource}`);
  },
  create(payload) {
    return Client.post(`${resource}`, payload);
  },
  update(payload, key) {
    return Client.patch(`securities/${key}.json`, payload);
  },
  delete(key) {
    return Client.delete(`securities/${key}.json`);
  }

  // MANY OTHER ENDPOINT RELATED STUFFS
};
