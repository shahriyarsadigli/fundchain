pragma solidity >=0.4.21 <0.6.0;
import "./Users.sol";


contract Fundraising {
    string public name;
    uint public projectNum = 0;

    mapping (uint => Project) public projects;

    Users public usersContract;

    constructor(address _usersContractAddress) public {
        usersContract = Users(_usersContractAddress);
        name = "Fundraising in Blockchain";
    }

    enum Category { Other, Technology, Health, Environment, Education, Art }

    struct Project {
        uint id;
        string title;
        string excerpt;
        string body;
        string slug;
        Category category;  
        address payable creator;
        uint targetAmount;
        uint amountRaised;
        uint createdAt;
    }

    event projectCreated(
        uint id,
        string title,
        string excerpt,
        string body,
        string slug,
        Category category,
        address payable creator,
        uint targetAmount,
        uint amountRaised,
        uint createdAt
    );

    event projectDonated(
        uint id,
        string title,
        string excerpt,
        string body,
        string slug,
        Category category,
        address payable creator,
        uint targetAmount,
        uint amountRaised,        
        uint createdAt
    );

    event projectDeleted(
        uint id,
        string title,
        string excerpt,
        string body,
        string slug,
        Category category,
        address payable creator,
        uint targetAmount,
        uint amountRaised,
        uint createdAt
    );

    function createProject(string memory _title, string memory _excerpt, string memory _body, string memory _slug, Category _category, uint _targetAmount) public {
        uint _amountRaised = 0;
        require(bytes(_title).length > 0);
        require(bytes(_excerpt).length > 0);
        require(bytes(_body).length > 0);
        require(_targetAmount > 0);
        require(_category <= Category.Art, "Invalid category");


        // Add any additional requirements for the category here


        // add to the number of projects the user created and modify in Users contract
        usersContract.addProject(msg.sender);

        uint _createdAt = block.timestamp;

        projectNum++;
        projects[projectNum] = Project(projectNum, _title, _excerpt, _body, _slug, _category, msg.sender, _targetAmount, _amountRaised, _createdAt);
        emit projectCreated(projectNum, _title, _excerpt, _body, _slug, _category, msg.sender, _targetAmount, _amountRaised, _createdAt);
    }

    function donateProject(uint _id) public payable { // we make it payable to be able to make transactions
        Project memory _project = projects[_id];

        address payable _fundraiser = _project.creator;

        // add here requirements to check validity

        require(_project.id > 0 && _project.id <= projectNum);

        require(_fundraiser != msg.sender); // prevent self donation

        require(msg.value > 0); // the donation amount must be above zero

        require(msg.value + _project.amountRaised <= _project.targetAmount); // the donation amount must not exceed the target amount


        _project.amountRaised += msg.value;
        
        // // update the number of donations and total donations made by the user
        usersContract.addDonation(msg.sender, address(_fundraiser), msg.value);
        
        
        projects[_id] = _project; // update the project

        address(_fundraiser).transfer(msg.value); // transfer the amount to the fundraiser


        
        emit projectDonated(projectNum, _project.title, _project.excerpt, _project.body, _project.slug, _project.category, _fundraiser, _project.targetAmount, _project.amountRaised, _project.createdAt);  

    }

    function deleteProject(uint _id) public {
        Project memory _project = projects[_id];

        address payable _fundraiser = _project.creator;

        require(_project.id > 0 && _project.id <= projectNum); // Check if the project ID is valid
        require(_fundraiser == msg.sender); // Only the project creator can delete the project
        require(_project.amountRaised < _project.targetAmount / 20); // Check if less than 5% of the target amount has been raised

        usersContract.deletedProject(msg.sender);

        // Delete the project from the mapping
        delete projects[_id];

        emit projectDeleted(projectNum, _project.title, _project.excerpt, _project.body, _project.slug, _project.category, _fundraiser, _project.targetAmount, _project.amountRaised, _project.createdAt);
    }

}
