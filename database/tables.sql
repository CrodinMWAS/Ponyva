CREATE TABLE MeasurementData(
    PersonId INT NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100), 
    County VARCHAR(40),
    ZipCode VARCHAR(20),  
    TownName VARCHAR(100),
    StreetName VARCHAR(100),
    HouseNumber VARCHAR(15),
    Email VARCHAR(100),   
    PhoneNumber VARCHAR(15),
    MeasurementDate VARCHAR(10),
    TarpTypes Varchar(20),
    PRIMARY KEY(PersonId)
)

CREATE TABLE Support(
    PersonId int NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),  
    County VARCHAR(40),
    ZipCode VARCHAR(20),  
    TownName Varchar(100),
    StreetName Varchar(100),
    HouseNumber Varchar(15),
    Email VARCHAR(100),   
    PhoneNumber Varchar (15),
    CustomData Varchar(200),
    PRIMARY KEY(PersonId)
)

CREATE TABLE Interest(
    PersonId int NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100),  
    County VARCHAR(40),
    ZipCode VARCHAR(20),  
    TownName Varchar(100),
    StreetName Varchar(100),
    HouseNumber Varchar(15),
    Email VARCHAR(100),  
    PhoneNumber Varchar (15),
    CustomData Varchar(200),
    PRIMARY KEY(PersonId)
)