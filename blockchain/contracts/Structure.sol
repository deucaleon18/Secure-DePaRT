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
        string uid;
        address Manufacturer;
        string manufacturerName;
        string manufacturerDetails;
        string location;
        uint256 createdAt;
    }

    struct WarehouseDetails {
        address warehouse;
        string warehouseManager;
        string warehouseLocation;
    }
    
    struct DeliveryDetails {
        address delivery;
        
    }

    enum State {
        ShippedByManufacturer,
        UserReturnInitiated,
        PackageDamgedAndReturnInitiated,
        ReceivedByManufacturer,
        ReceivedByWarehouse,
        ShippedByWarehouse,
        PickedByDeliveryBoy,
        ReceivedByCustomer
    }

    struct History{
        State state;
        uint256 latitude;
        uint256 longitude;
        uint256 time;
        bool returnStatus;
        string pointName;
    }

    struct Product {
        string uid;
        string productName;
        uint256 productPrice;
        uint quantity;
        address owner;
        address manufacturer;
        uint warrantyPeriod;
        bool warrantyExpire;
        State productState;
        History[] history;
        //string transaction;
    }
  
  
}