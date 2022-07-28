// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


library Structure {
    enum Roles {
        NoRole,
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
        uint warrantyPeriod;
        bool warrantyExpire;
        State productState;
        string[] history;
        //string transaction;
    }
    enum State {
        Manufactured,
        ShippedByManufacturer,
        ReceivedByWarehouse,
        ShippedByWarehouse,
        ReceivedByDeliveryBoy,
        ReceivedByCustomer
    }
  
}