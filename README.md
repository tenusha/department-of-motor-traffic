# Department of Motor Traffic (DMT) - Mobile App

## Introduction

The original DMT app has three main features, which are view ongoing vehicle numbers, vehicle details and revenue license status. This app is an improved version of the previous app with user experience and performance improvements. Also there are new features such as vehicle management, where users can register and track their own vehicles as well as recieve notifications on revenue license stataus. This app has the ability to pay fines of the user online. 

The app is developed using React Native, NodeJs, Java Spring Boot and MongoDB.
<p></p><br />

<img src="https://i.ibb.co/7CK5WXz/home.png" alt="Capture27" border="0" width="30%">
Figure_1: home screen
<p></p><br />

## Features of the application

### 1)  Sign up 

If user is a new to DMT, he/she can regiter to the app or simply login to the system using username and password. Also, users can use their social accounts to login to the app.
<p></p><br />

<img src="https://i.ibb.co/KDTFwPq/login-reg.png" alt="Capture27" border="0" width="50%">
Figure_2: login and registration
<p></p><br />

### 2) Revenue License Status 

Once user enter the valid vehicle number, it displays the license details of the entered vehicle.
<p></p><br />

<img src="https://i.ibb.co/nn914Q1/rls.png" alt="Capture27" border="0" width="30%">
Figure_3: revenue license status
<p></p><br />

### 3)  My vehicles 

User can add new vehicle to his/her account by providing the “Vehicle Number”. Then users can track their vehicles. A colour schema is used to track fines (per week) for that vehicle (eg: green - no fines, orange - less than 3, red - more than 3)
<p></p><br />

<img src="https://i.ibb.co/Cb35xR3/vm.png" alt="Capture27" border="0">
Figure_4: my vehicle management
<p></p><br />

### 4) Vehicle Details 

Once user enters the valid vehicle number, it displays the vehicle details of the entered vehicle.
<p></p><br />

<img src="https://i.ibb.co/CQ9SrPN/vd.png" alt="Capture27" border="0" width="30%">
Figure_5: home screen
<p></p><br />

### 5) Fine Management 

User can Pay the Fines Online by clicking the “PAY” button for the Fines with “NOT PAID” Status. Allow user to pay fines using credit/debit card.
<p></p><br />

<img src="https://i.ibb.co/Ch0Cvr6/fm.png" alt="Capture27" border="0">
Figure_5: home screen
<p></p><br />

### 6) Ongoing Numbers

Users can view the current onging number of the each vehicle category.
<p></p><br />

<img src="https://i.ibb.co/rQHvVBZ/on.png" alt="Capture27" border="0" width="30%">
Figure_5: home screen
<p></p><br />

## Limitations

• Still there is no back end support for social login.

• Dummy payment gateway is used.

• Real DMT api is not used to get relevant information.


## Future Improvements

• Add the ability to track your vehicle using GPS from your phone.

• Overcome and fix the current limitations.

• Add the ability for police to view fine history of a vehicle when the vehicle number is entered.

## Steps to Deploy

1) Go to department-of-motor-traffic/DMT and run following commands
```
	> yarn install
	> expo start
```	
2) Go to department-of-motor-traffic/Services/node and run following commands
```
	> npm install
	> npm start
```	
3) Go to department-of-motor-traffic/Services/uee-user-backend and run following commands
```
	> mvn clean install
	> go to /target/
	> java -jar uee-user-backend-0.0.1-SNAPSHOT.jar
```
## Copyright

(C) 2019 Tenusha Guruge
<br>
[tenusha.wordpress.com](https://tenusha.wordpress.com)
