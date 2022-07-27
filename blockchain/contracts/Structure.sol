// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


library Structure {
    enum Roles {
        Employe,
        Manufacturer,
        Warehouse,
        DeliveryBoy,
        Customer
    }

    struct ManufactureDetails {
        uint256 uid;
        address Manufacturer;
        string manufacturerName;
        string manufacturerDetails;
        string location;
        uint256 createdAt;
    }

    struct WarehouseDetails {
        address Warehouse;
        bytes32 warehouseManager;
        string WarehouseLocation;
    }

    struct Product {
        uint256 uid;
        string productName;
        uint256 productPrice;
        uint quantity;
        address owner;
        address manufacturer;
        // WarehouseDetails Warehouse;
        uint warrantyPeriod;
        // bool warrantyExpire = false;
        // State productState;
        // string[] log;
        // address customer;
        // string transaction;
    }
    struct Order {
        string transaction;
        uint256 productuid;
        State productState;
        address customer;
        uint warrantyPeriod;
        bool warrantyExpire;
        string[] log;
    }
    enum State {
        Manufactured,
        ShippedByManufacturer,
        ReceivedByWarehouse,
        ShippedByWarehouse,
        ReceivedByDeliveryBoy,
        ReceivedByCustomer,
    }
  
}