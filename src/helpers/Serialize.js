export default class Serialize {
  /**
   *
   * @param data
   * @return {Array}
   */
   static serializeFirebaseResponseData(data) {
    let serializeData = [];
    Object.keys(data).forEach((key) => {
      const securityWithKey = Object.assign({}, data[key], { key: key });
      serializeData.push(securityWithKey);
    })
    return serializeData
  }
}
