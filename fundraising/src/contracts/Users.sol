pragma solidity >=0.4.21 <0.6.0;

contract Users {
    string public className;
    uint public userNum = 0;

    mapping(address => User) public users;
    mapping(string => bool) private usernameExists;
    mapping(string => bool) private emailExists;


    struct User {
        address userAddress;
        string name;
        string surname;
        string username;
        string email;
        bytes32 passwordHash;
        uint numDonations;
        uint numProjects;
        uint totalDonationsFunded;
        uint totalDonationsReceived;
    }

    event userCreated(
        address userAddress,
        string name,
        string surname,
        string username,
        string email,
        bytes32 passwordHash
    );

    constructor () public {
        className = "Users Creation";
    }

    function createUser(string memory _name, string memory _surname, string memory _username, string memory _email, bytes32 _passwordHash) public {
        require(users[msg.sender].userAddress == address(0), "This address already has an account!");
        require(!usernameExists[_username], "Username already exists");
        require(!emailExists[_email], "Email already taken");
        // check the password?

        uint _numDonations = 0;
        uint _numProjects = 0;
        uint _totalDonationsFunded = 0;
        uint _totalDonationsReceived = 0;



        users[msg.sender] = User(msg.sender, _name, _surname, _username, _email, _passwordHash, _numDonations, 
                                                _numProjects, _totalDonationsFunded, _totalDonationsReceived);
        usernameExists[_username] = true;
        emailExists[_email] = true;


        emit userCreated(msg.sender, _name, _surname, _username, _email, _passwordHash);
    }

    function loginUser(string memory _username, bytes32 _passwordHash) public view returns(bool) { // marked as view since it does not modify the state of the contract
        require(usernameExists[_username], "Username does not exist");
        address userAddress = users[msg.sender].userAddress;
        bytes32 storedPasswordHash = users[userAddress].passwordHash;
        if (storedPasswordHash == _passwordHash) {
            return true;
        } else {
            return false;
        }
    }

    function addDonation(address _userAddressDonor, address _userAddressFundraiser, uint _amount) public {
        require(users[_userAddressDonor].userAddress != address(0), "User does not exist.");
        // require(users[_userAddressFundraiser].userAddress != address(0), "User does not exist.");
        users[_userAddressDonor].numDonations++;
        users[_userAddressDonor].totalDonationsFunded += _amount;
        users[_userAddressFundraiser].totalDonationsReceived += _amount;
    }

    function addProject(address _userAddressCreator) public {
        // require(users[_userAddressCreator].userAddress != address(0), "User does not exist.");
        users[_userAddressCreator].numProjects++;
    }

    function deletedProject(address _userAddressCreator) public {
        // require(users[_userAddressCreator].userAddress != address(0), "User does not exist.");
        users[_userAddressCreator].numProjects--;
    }


}