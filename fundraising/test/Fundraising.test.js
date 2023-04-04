const { assert } = require("chai")

const Fundraising = artifacts.require('./Fundraising.sol')

require('chai').use(require('chai-as-promised')).should()

contract('Fundraising', ([deployer, fundraiser, donor]) => {
  let fundraising;

  before(async () => {
    fundraising = await Fundraising.deployed()
  })

  describe('deployment', async () => {
    it('successful deployment', async () => {
      const address = await fundraising.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })


    it('name exists', async () => {
      const name = await fundraising.name()
      assert.equal(name, 'Fundraising in Blockchain')
    })

  })

  describe('projects', async () => {
    let projectOutcome, projectNum;

    before(async () => {
        projectOutcome = await fundraising.createProject('FundChain StartUP',
        'this is excerpt', 'this is body', '10000', { from: fundraiser });
        projectNum = await fundraising.projectNum()
      })



    it('creates a project', async () => {
      // successful creation
        assert.equal(projectNum, 1);
        const event = projectOutcome.logs[0].args

        assert.equal(event.id.toNumber(), projectNum.toNumber(), 'id is correct')
        assert.equal(event.title, 'FundChain StartUP', 'title is correct')
        assert.equal(event.excerpt, 'this is excerpt', 'excerpt is correct')
        assert.equal(event.body, 'this is body', 'body is correct')
        assert.equal(event.targetAmount, '10000', 'Target Amount is correct')
        assert.equal(event.creator, fundraiser, 'fundraiser is correct')

        // unsuccessful... because of missing parameters
         // add the rest of missing ones to check all unsuccessful attempts
        await fundraising.createProject('', 'this is excerpt', 'this is body', 
        '10000', '0', { from: fundraiser }).should.be.rejected;
        
        await fundraising.createProject('FundChain StartUP', '', 'this is body', 
        '10000', '0', { from: fundraiser }).should.be.rejected;

        await fundraising.createProject('FundChain StartUP', 'this is excerpt', '', 
        '10000', '0', { from: fundraiser }).should.be.rejected;

        await fundraising.createProject('FundChain StartUP', 'this is excerpt', 'this is body', 
        0, '0', { from: fundraiser }).should.be.rejected;
        
    })

    it('lists projects', async () => {
        const project = await fundraising.projects(projectNum);

        assert.equal(project.id.toNumber(), projectNum.toNumber(), 'id is correct')
        assert.equal(project.title, 'FundChain StartUP', 'title is correct')
        assert.equal(project.excerpt, 'this is excerpt', 'excerpt is correct')
        assert.equal(project.body, 'this is body', 'body is correct')
        assert.equal(project.targetAmount, '10000', 'Target Amount is correct')
        assert.equal(project.creator, fundraiser, 'fundraiser is correct')
    })

    it('donates projects', async () => {
        // the old balance of the fundraiser
        // let oldBalance;
        // oldBalance = await web3.eth.getBalance(fundraiser)
        // oldBalance = new web3.utils.BN(oldBalance)

        // successful donation
        let projectOutcome = await fundraising.donateProject(projectNum, { from: donor, value: '10000'});

        // logs
        const event = projectOutcome.logs[0].args

        assert.equal(event.id.toNumber(), projectNum.toNumber(), 'id is correct')
        assert.equal(event.title, 'FundChain StartUP', 'title is correct')
        assert.equal(event.excerpt, 'this is excerpt', 'excerpt is correct')
        assert.equal(event.body, 'this is body', 'body is correct')
        assert.equal(event.targetAmount, '10000', 'Target Amount is correct')
        assert.equal(event.creator, fundraiser, 'fundraiser is correct')

        // the updated balance after the donation
        // let updatedBalance;
        // updatedBalance = await web3.eth.getBalance(fundraiser)
        // updatedBalance = new web3.utils.BN(updatedBalance)

        // check the balance to see if the money is transferred correctly

        
        // unsuccessful donation
        // invalid id
        // await fundraising.donateProject(100, { from: donor, value: '10000'}).should.be.rejected;
        // // donating 0 ether
        // await fundraising.donateProject(projectNum, { from: donor, value: '0'}).should.be.rejected;
    })


    it('deletes project', async () => {
      // console.log("SALAM")
      
      const projectNum = 2;

      // create one more project to test deletion
      let projectOutcome = await fundraising.createProject('FundChain StartUP',
      'this is excerpt', 'this is body', '10000', { from: fundraiser });

      // console.log(projectOutcome.logs[0].args.id.toNumber())

      assert.equal(projectOutcome.logs[0].args.id.toNumber(), projectNum, 'id is correct');
      
      // delete the project
      fundraising.deleteProject(projectNum, {from: fundraiser});
  
      // verify that the project no longer exists
      let project = await fundraising.projects(projectNum);
      
      // check if the project is deleted
      assert.equal(project[1], "");
    });
    
  })
})
