# Parking Sniffer

Parking Sniffer is a project aiming to create a peer to peer parking space network to solve the issue of limited parking space in major cities.

## Background And Overview

A person to person parking app that connects users in an area that need parking, with the users in an area offering parking. App utilizes Google Maps API to allow searches in a set area. Owners of parking spaces set their own price and set restrictions on type of car and range of stay.

## Functionality And MVP

- [X] User authentication and validation. Users are both renters and sellers.  
- [X] Creating a property . Sellers will be able to publish details about their properties and also be able to set restrictions pertaining to the usage
- [X] Search - utilizes Google Maps and integrates with our API for targeted search anywhere in the US.
- [X] Renters will be able to filter and select parking spaces through the search and rent parking spaces according to their needs.
- [X] The application will be seeded with data and deployed in heroku.

## Bonus Features

- [ ] Seller property authentication.
- [ ] Direction to sellers location though maps .
- [ ] Add boat spaces to type of property and allow renters to rent boat spaces for boats.

## Technologies

- [X] MERN Stack: (Mongo, Express.js, React, Node.js)
- [X] Google MAPS API  

## Wireframes

![Design Documentation](https://raw.githubusercontent.com/nmhalloran/parking-sniffer/master/wireframes/Parking.png)

## Accomplished over the weekend

- [X] Completed MERN stack tutorial and created project repo.
- [X] Completed Front end authentication.
- [X] Researched on Google Maps API and discussed on various places to implement it in our project
- [X] Completed all design documentation
- [X] Created and tested implementation of Maps Javascript Api to a location in map.

## Group Members and Work Breakdown

Alfred Alejandrino, Maxim Grebennikov, Nick Halloran, Meenakshi Anand Narayan

## Day 1

- [X] Create backend for sellers  
- [X] Create backend for properties
- [X] Implement google map implementation necessary for sellers and properties
- [X] Implement routes and controller actions necessary for sellers and properties.

## Day 2

- [X] Implement redux cycle for sellers  
- [X] Implement redux cycle for properties
- [X] Create backend for search model
- [X] Complete the necessary styling needed for user auth and creating a seller property form .

## Day 3

- [X] Complete the redux cycle for the search model .
- [X] Integrate Google maps view with populated seller property.
- [X] Complete the styling and test for edge cases.

## Day 4

- [X] Create the backend for the renters .
- [X] Create profile view for users.
- [X] complete redux cycle for users and renters .
- [X] Add necessary styling .

## Day 5

- [X] Start seeding the data .
- [X] Test all the mvp's for any errors.
- [X] Dedicate the day for styling and other unfinished issues .

## Day 6

- [X] Add pictures to both sellers and renters crete form .
- [X] Allow them to upload pictures using AWS and paperclip.
- [X] Continue styling .

## Day 7

- [X] Test the application for errors and deploy the app to heroku
- [X] Complete the project README
