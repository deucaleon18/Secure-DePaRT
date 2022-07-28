// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Structure.sol";


contract SecureDePaRT {
       address public immutable i_owner; //This will be the Employe

    constructor() {
        i_owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == i_owner, "Must be a Owner to call this");
        _;
    }
    mapping(address => Structure.Roles) public role; //address mapped to roles
    mapping(address => Structure.ManufactureDetails) public manufacture; //manufacture
    mapping(address => Structure.WarehouseDetails) public warehouse; //warehouse
    mapping(uint256 => Structure.Product) public products; //products to be added by Employe

    event RoleAdded(address _address, Structure.Roles _role);
    event ManufactureAdded(
        uint256 _uid,
        address _address,
        string _manufactureName
    );
    event ProductsAdded(uint256 _uid, string _productName);

    // Used by Employe
    function addRole(address _address, Structure.Roles _role) public onlyOwner{
        require(
            role[_address] == Structure.Roles.NoRole,
            "Role has already been assigned"
        );
        role[_address] = _role;
        emit RoleAdded(_address, _role);
    }

    function getRole(address _address) public view returns (Structure.Roles) {
        return role[_address];
    }

    function addManufacture(
        uint256 _uid,
        address _Manufacturer,
        string memory _manufacturerName,
        string memory _manufacturerDetails,
        string memory _location
    ) public {
        manufacture[_Manufacturer] = Structure.ManufactureDetails(
            _uid,
            _Manufacturer,
            _manufacturerName,
            _manufacturerDetails,
            _location,
            block.timestamp
        );
        emit ManufactureAdded(_uid, _Manufacturer, _manufacturerName);
    }

    // Used by  Manufacturer
    modifier isManufacture() {
        require(
            role[msg.sender] == Structure.Roles.Manufacturer,
            "Must be a Manufacturer to call this"
        );
        _;
    }

    function addProducts(
        uint256 _uid,
        string memory _productName,
        uint256 _productPrice,
        uint _quantity,
        address _owner,
        address _manufacturer,
        uint _warrantyPeriod,
        bool _warrentyExpire,
        string memory _history
    ) public isManufacture {
        products[_uid].uid=_uid;
        products[_uid].productName=_productName;
        products[_uid].productPrice=_productPrice;
        products[_uid].quantity=_quantity;
        products[_uid].owner=_owner;
        products[_uid].manufacturer=_manufacturer;
        products[_uid].warrantyPeriod=_warrantyPeriod;
        products[_uid].warrantyExpire=_warrentyExpire;
        products[_uid].history.push(_history);
        products[_uid].productState=Structure.State.ShippedByManufacturer;
        emit ProductsAdded(_uid, _productName);
    }
}