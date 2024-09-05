const DataModel = require('../models/DataModel')
const DataService = {
  add: async (body) => {
    return DataModel.create(body)
  },
  addCloud: async ({ conductance, ph, temperature, turbidity }) => {
    return DataModel.create({ conductance, ph, temperature, turbidity })
  },
  getList: async ({ _id }) => {
    return _id ? DataModel.find({ _id }, ['conductance', 'ph', 'temperature', 'turbidity'])
      : DataModel.find({}, ['conductance', 'ph', 'temperature', 'turbidity'])
  },
  putList: async (data) => {
    for (const key in data) {
      if (key !== '_id' && typeof data[key] === 'string') {
        data[key] = parseFloat(data[key])
      }
    }
    return DataModel.updateOne({ _id: data._id }, { data })
  },
  delList: async ({ _id }) => {
    return DataModel.deleteOne({ _id })
  }
}
module.exports = DataService