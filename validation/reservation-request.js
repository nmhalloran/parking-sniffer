const Validator = require("validator");
const mongoose = require("mongoose");
const express = require("express");
// Load Reservation model
const Reservation = require("../models/Reservation.js");

module.exports = async function overlappingRequests(data,req_spot_id){
  var start_date = Date.parse(data.start_date);
  var end_date = Date.parse(data.end_date);
  var today = Date.parse(new Date());
  if (start_date > end_date){
    return true;
  }else if (start_date < today ){
    return true;
  }
  return new Promise((res,rej)=>{
    Reservation.find({spot_id: data.spot_id,booking_status:'accepted'})
    .then(reservations=>{
      console.log(reservations)
      reservations.forEach((el)=>{
        if(Date.parse(el.start_date)==start_date || Date.parse(el.end_date)==start_date){
          res(true);
        }else if(Date.parse(el.start_date)==end_date || Date.parse(el.end_date)==end_date){
          res(true);
        }else if ((Date.parse(el.start_date) < start_date) &&
        (Date.parse(el.end_date) > start_date && Date.parse(el.end_date) < end_date)){
          console.log("me");
          res(true);
        }else if (((Date.parse(el.start_date) > start_date)&&(Date.parse(el.start_date) < end_date))
         && ((Date.parse(el.end_date) < end_date)&&(Date.parse(el.end_date) > start_date))){
          res(true);
        }else if (((Date.parse(el.start_date) > start_date) && (Date.parse(el.start_date) < start_date))
         && (Date.parse(el.end_date) > end_date)){
          res(true);
        }else if ((Date.parse(el.start_date) < start_date) && (Date.parse(el.end_date) > end_date)){
          res(true);
        }
      });
      res(false);
    });
  })

};
