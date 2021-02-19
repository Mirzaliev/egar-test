export default class Serialize {
  /**
   *
   * @param data
   * @return {Array}
   */
   static serializeFirebaseResponseData(data) {
    let serializeData = [];
    Object.keys(data).forEach((key) => {
      const securitiesWithKey = Object.assign({}, data[key], { key: key });
      serializeData.push(securitiesWithKey);
    })
    return serializeData
  }
}
