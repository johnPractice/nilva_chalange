# In the name of Allah

# Nilva Chalange ยฉ

[link]: (https://github.com/nilva-challenge/Node-Nilivia)

## Code Architecture ๐ 

The code structure is implemented using the MVC architecture.
**Service folder for Model**
**Controller folder for Controller** and
**Router folder for View**

## DataBase ๐

![Basic DB Model](https://github.com/johnPractice/nilva_chalange/blob/dev/DB/DB.png)

## API ๐น

at first create API end point for some basic thing **SignUp** , **Login**,**Create Room**,**Create Question** and .....
In general we have **User** , **Room** and **Question** API end point.

## Socket โ

for send and recive data in real time i user socket.io.
define **global** variable to save socket instance and use it when we need some extra check the send and recive data from client othwe wise create class named **webSocket** for contorole socket send and recive data.

## Utils ๐ง

create some utils file in utils folder like some **Midelware** and some util function for using in other file.

## Test ๐งช

add some test and github action but not configurtion DB then cant pass test ๐

## Assumptions โ

It is assumed that some checks are done on the user side like time check for send answer in room and Requests are implemented in the simplest possible way.
