function getOperation (el, obj) {
  if (operations[el]) {
    return operations[el]
  }

  if (obj != null) {
    for (var key in operations) {
      if (obj[key]) {
        return operations[key]
      }
    }
  }

  return eq
}

function gt (q, table, el, obj, op) {
  return q[op](table[el].gt(obj.$gt))
}

function gte (q, table, el, obj, op) {
  return q[op](table[el].gt(obj.$gte))
}

function lt (q, table, el, obj, op) {
  return q[op](table[el].lt(obj.$lt))
}

function lte (q, table, el, obj, op) {
  return q[op](table[el].lte(obj.$lte))
}

function eq (q, table, el, obj, op, type) {
  if (type.complexType) {
    if (obj == null) {
      // we check that all columns on complex prop are null in case the root prop is null
      for (var prop in type.complexType) {
        q = q[op](table[el + '_' + prop].isNull())
      }
      return q
    }

    for (var pp in type.complexType) {
      if (typeof obj[pp] !== 'undefined') {
        q = getOperation(el, type.complexType[pp])(q, table, el + '_' + pp, obj[pp], 'where', type.complexType[pp])
      }
    }
    return q
  }

  if (obj == null) {
    return q[op](table[el].isNull())
  }

  if (type.isPrimitive) {
    return q[op](table[el].equals(obj))
  } else {
    return q[op](table[el].like('%' + obj + '%'))
  }
}

function and (q, table, elG, obj, op, type) {
  for (var i = 0; i < obj.length; i++) {
    var filter = obj[i]

    for (var el in filter) {
      if (filter[el]) {
        q = getOperation(el, filter[el])(q, table, el, filter[el], 'and', type[el] || type)
      }
    }
  }

  return q
}

function or (q, table, elG, obj, op, type) {
  for (var i = 0; i < obj.length; i++) {
    var filter = obj[i]

    for (var el in filter) {
      if (filter[el]) {
        q = getOperation(el, filter[el])(q, table, el, filter[el], 'or', type[el] || type)
      }
    }
  }

  return q
}

function inFn (q, table, el, obj, op) {
  return q[op](table[el].in(obj.$in))
}

module.exports = function doFilter (query, table, filter, entityType) {
  for (var el in filter) {
    query = getOperation(el, filter[el])(query, table, el, filter[el], 'where', entityType[el] || entityType)
  }

  return query
}

var operations = {
  $gt: gt,
  $gte: gte,
  $lt: lt,
  $lte: lte,
  $and: and,
  $or: or,
  $in: inFn
}
