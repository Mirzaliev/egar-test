export default class Serialize {
  /**
   * Firebase отдает даные в неудобном формате
   * поэтому решил сериализовать массив в удобном для себя формате
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
