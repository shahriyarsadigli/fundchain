const Fundraising = artifacts.require("Fundraising");
const Users = artifacts.require("Users");


module.exports = function(deployer) {
  deployer.deploy(Fundraising);
  deployer.deploy(Users);
};
