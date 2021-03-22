drop database if exists Users;
create database if not exists Users;

use Users;

drop table if exists account;
create table account(
	users varChar(36),
    `password` varChar(100),
    FirstName varChar(25),
    LastName varChar(25),
    primary key(users)
);

