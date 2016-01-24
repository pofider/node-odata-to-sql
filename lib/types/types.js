module.exports = function (dialect) {
  switch (dialect) {
    case 'mssql':
      return require('./mssql')
    case 'postgres':
      return require('./postgres')
  }

  throw new Error('Dialect ' + dialect + ' not supproted in type mappings')
}
