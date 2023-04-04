const { assert } = require("chai")

const Users = artifacts.require('./Users.sol')

require('chai').use(require('chai-as-promised')).should()

contract('Users', ([user]) => {
  let users;

  before(async () => {
    users = await Users.deployed()
  })

  describe('deployment', async () => {
    it('successful deployment', async () => {
      const address = await users.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('name exists', async () => {
      const className = await users.className()
      assert.equal(className, 'Users Creation')
    })
  })

  describe('users', async () => {
    let userOutcome;
    const passwordHash = web3.utils.keccak256('password');

    before(async () => {
      userOutcome = await users.createUser('name', 'surname', 'username', 'email', passwordHash, { from: user });
  })


    it('creates a user', async () => {
      // successful creation
      const event = userOutcome.logs[0].args

      assert.equal(event.name, 'name', 'name is correct')
      assert.equal(event.surname, 'surname', 'surname is correct')
      assert.equal(event.username, 'username', 'username is correct')
      assert.equal(event.email, 'email', 'email is correct')
      assert.equal(event.userAddress, user, 'User Address is correct')  
  })
    
  })
})
