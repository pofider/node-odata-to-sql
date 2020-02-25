require('should')
var model = require('./model')
var transformator = require('../index')

describe('transformer', function () {
  var convertor

  beforeEach(function () {
    convertor = transformator(model, 'mssql')
  })

  it('should create ddl statements', function () {
    convertor.create()[0].text.should.be.eql("IF NOT EXISTS(SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'UserType') BEGIN CREATE TABLE [UserType] ([_id] varchar(max), [date] datetime2(2), [int] integer, [bool] bit, [address_street] varchar(max), [address_number] integer) END")
  })

  it('should create insert statements', function () {
    var q = convertor.insert('users', { _id: 'foo' })
    q.text.should.be.eql('INSERT INTO [UserType] ([_id]) VALUES (@1)')
    q.values.should.have.length(1)
    q.values[0].should.be.eql('foo')
  })
})
