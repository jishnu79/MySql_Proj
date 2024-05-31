create table users (
    id int primary key AUTO_INCREMENT,
    name varchar (250),
    contactNumber varchar(20),
    email varchar (50),
    password varchar(250),
    status varchar(20),
    role varchar (20),
    unique (email)
);

insert into users(
    name,contactNumber,email,password,status,role
    )values('Admin','1234567890','admin@gmail.com','admin','true','admin');            

create table category (
    id into not null AUTO_INCREMENT,
    name varchar(255) not null,
    primary mey(id)
);