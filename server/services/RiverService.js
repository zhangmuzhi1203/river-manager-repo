const RiverModel = require('../models/RiverModel')
const RiverService = {
  add: async (body) => {
    return RiverModel.create(body)
  },
  getList: async ({ _id }) => {
    return _id ? RiverModel.find({ _id }, ['rivername', 'riveraddress', 'pollutionlevel', 'ishandle', 'description'])
      : RiverModel.find({}, ['rivername', 'riveraddress', 'pollutionlevel', 'ishandle', 'description'])
  },
  putList: async (body) => {
    return RiverModel.updateOne({ _id: body._id }, body)
  },
  delList: async ({ _id }) => {
    return RiverModel.deleteOne({ _id })
  }
}

module.exports = RiverService