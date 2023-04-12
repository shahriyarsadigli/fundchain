pragma solidity >=0.4.21 <0.6.0;

contract Fundraising {
    string public name;
    uint public projectNum = 0;

    mapping (uint => Project) public projects;

    enum Category { Other, Technology, Health, Environment, Education, Art }

    struct Project {
        uint id;
        string title;
        string excerpt;
        string body;
        Category category;  
        address payable creator;
        uint targetAmount;
        uint amountRaised;
    }

    event projectCreated(
        uint id,
        string title,
        string excerpt,
        string body,
        Category category,
        address payable creator,
        uint targetAmount,
        uint amountRaised
    );

    event projectDonated(
        uint id,
        string title,
        string excerpt,
        string body,
        Category category,
        address payable creator,
        uint targetAmount,
        uint amountRaised
    );

    event projectDeleted(
        uint id,
        string title,
        string excerpt,
        string body,
        Category category,
        address payable creator,
        uint targetAmount,
        uint amountRaised
    );

    constructor () public {
        name = "Fundraising in Blockchain";
    }

    function createProject(string memory _title, string memory _excerpt, string memory _body, Category _category, uint _targetAmount) public {
        uint _amountRaised = 0;
        require(bytes(_title).length > 0);
        require(bytes(_excerpt).length > 0);
        require(bytes(_body).length > 0);
        require(_targetAmount > 0);
        require(_category <= Category.Art, "Invalid category");


        // Add any additional requirements for the category here

        projectNum++;
        projects[projectNum] = Project(projectNum, _title, _excerpt, _body, _category, msg.sender, _targetAmount, _amountRaised);
        emit projectCreated(projectNum, _title, _excerpt, _body, _category, msg.sender, _targetAmount, _amountRaised);
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
        
        
        
        projects[_id] = _project; // update the project

        address(_fundraiser).transfer(msg.value); // transfer the amount to the fundraiser


        
        emit projectDonated(projectNum, _project.title, _project.excerpt, _project.body, _project.category, _fundraiser, _project.targetAmount, _project.amountRaised);  

    }

    function deleteProject(uint _id) public {
        Project memory _project = projects[_id];

        address payable _fundraiser = _project.creator;

        require(_project.id > 0 && _project.id <= projectNum); // Check if the project ID is valid
        require(_fundraiser == msg.sender); // Only the project creator can delete the project
        require(_project.amountRaised < _project.targetAmount / 20); // Check if less than 5% of the target amount has been raised

        // Delete the project from the mapping
        delete projects[_id];

        emit projectDeleted(projectNum, _project.title, _project.excerpt, _project.body, _project.category, _fundraiser, _project.targetAmount, _project.amountRaised);
    }

}
