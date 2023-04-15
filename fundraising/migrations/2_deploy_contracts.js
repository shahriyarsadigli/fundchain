const Fundraising = artifacts.require("Fundraising");
const Users = artifacts.require("Users");


module.exports = function(deployer) {
  deployer.deploy(Users).then(function() {
    return deployer.deploy(Fundraising, Users.address);
  });
};
