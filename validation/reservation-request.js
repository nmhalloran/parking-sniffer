const Validator = require("validator");
// Load Reservation model
const Reservation = require("../models/Reservation.js");

module.exports = function overlappingRequests(data,req_spot_id){
  if (data.start_date > data.end_date){
    return true;
  }
  // }else if (data.start_date < Date.today() ){
  //   return true;
  // }
   Reservation.find({spot_id: req_spot_id , booking_status: "accepted"})
   .then(reservations=>{
     reservations.forEach((el)=>{
       if(el.start_date >= new Date(data.start_date) ||
       el.start_date <= new Date(data.end_date)){
         return true;
       }else if (el.end_date >= new Date(data.start_date) ||
       el.end_date <= new Date(data.end_date)){
         return true;
       }else{
         return false;
       }
     });
   });
};
