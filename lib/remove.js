module.exports = function (table, query) {
  var q

  q = table.delete()

  for (var filter in query) {
    if (query[filter].$gt) {
      q = q.where(table[filter].gt(query[filter].$gt))
    } else {
      q = q.where(table[filter].equals(query[filter]))
    }
  }

  return q.toQuery()
}
