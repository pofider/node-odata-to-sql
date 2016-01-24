module.exports = {
  namespace: 'jsreport',
  entityTypes: {
    'UserType': {
      '_id': {'type': 'Edm.String'},
      'date': {'type': 'Edm.DateTimeOffset'},
      'int': {'type': 'Edm.Int32'},
      'bool': {'type': 'Edm.Boolean'},
      'address': {'type': 'jsreport.AddressType'}
    }
  },
  complexTypes: {
    'AddressType': {
      'street': {'type': 'Edm.String'}
    }
  },
  entitySets: {
    'users': {
      entityType: 'jsreport.UserType'
    }
  }
}

