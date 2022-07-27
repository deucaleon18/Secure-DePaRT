// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";
import "./Structure.sol";

contract SecureDePaRT {
    address owner = msg.sender;                    //This will be the Employe
    modifier onlyEmploye(){
        require(msg.sender == owner, "Must be a Employe to call this");
        _;
    }

    mapping(address => Structure.Roles) public role;                         //address mapped to roles
    mapping(address => Structure.ManufactureDetails) public manufacture;     //manufacture
    mapping(address => Structure.WarehouseDetails) public warehouse;         //warehouse
    mapping(uint256 => Structure.Product) public products;                   //products to be added by Employe

    event RoleAdded(address _address, Structure.Roles _role);
    event ManufactureAdded(uint256 _uid, address _address, string _manufactureName);
    event ProductsAdded(uint256 _uid, string _productName);
    
    // Used by Employe
    function addRole(address _address, Structure.Roles _role) public onlyEmploye{
        role[_address] = _role;
        emit RoleAdded(_address, _role);
    }
    function addManufacture(uint256 _uid, address _Manufacturer, string memory _manufacturerName, string memory _manufacturerDetails, string memory _location) public onlyEmploye{
        manufacture[_Manufacturer] = Structure.ManufactureDetails(_uid, _Manufacturer, _manufacturerName, _manufacturerDetails, _location, block.timestamp);
        emit ManufactureAdded(_uid, _Manufacturer, _manufacturerName);
    }

    // Used by  Manufacturer
    modifier isManufacture() {
        require(role[msg.sender] == Structure.Roles.Manufacturer, "Must be a Manufacturer to call this");
        _;
    }
    function addProducts(uint256 _uid, string memory _productName, uint256 _productPrice, uint _quantity,  address _owner,address  _manufacturer, uint _warrantyPeriod) public isManufacture() {
        products[_uid] = Structure.Product(_uid, _productName, _productPrice, _quantity, _owner,  _manufacturer, _warrantyPeriod);
        emit ProductsAdded(_uid, _productName);
    }
}