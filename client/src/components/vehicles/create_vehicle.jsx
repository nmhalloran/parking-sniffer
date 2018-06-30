import React from "react";
import $ from "jquery";
import { withRouter } from "react-router-dom";
import { compose, withStateHandlers } from "recompose";

class CreateVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.vehicle;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createSpot(this.state);
    }

    handleChange(val) {
        return (e) => {
            if (val === 'vehicle_type') {
                this.state.vehicle_type = e.currentTarget.value;
            } else if (val === 'plate_no') {
                this.state.plate_no = e.currentTarget.value;
            } else if (val === 'color') {
                this.state.color= e.currentTarget.value;
            } else if (val === 'year') {
                this.state.year = e.currentTarget.value;
            } else if (val === 'model') {
                this.state.model = e.currentTarget.value;
            }
          this.setState(this.state);
        };
    }


    render() {
       return(
         <div>
           <h1>Add your vehicle details</h1>
           <form>
             <div>
               <label> Vehicle Type</label>
               <input type="checkbox" id="motorcycle"
                 onClick={this.handleChange("vehicle_type")}
                  name="vehicletype" value="motorcycle" />
               <label htmlFor="motorcycle">Motorcycle</label>

               <input type="checkbox" id="compact"
                 onClick={this.handleChange("vehicle_type")}
                 name="vehicletype" value="compact" />
               <label htmlFor="compact">Compact</label>

               <input type="checkbox" id="sedan"
                 onClick={this.handleChange("vehicle_type")}
                 name="vehicletype" value="sedan" />
               <label htmlFor="fullsize">Sedan</label>

               <input type="checkbox" id="truck"
                 onClick={this.handleChange("vehicle_type")}
                 name="vehicletype" value="truck" />
               <label htmlFor="truck">Truck</label>
             </div>
             <div>
               <label> Plate No </label>
               <input onChange={this.handleChange("plate_no")} type="text" />
             </div>
             <div>
               <label> Color </label>
               <input onChange={this.handleChange("color")} type="text" />
             </div>
             <div>
               <label> Model </label>
               <input onChange={this.handleChange("model")} type="text" />
             </div>
             <div>
               <label> Year </label>
               <input onChange={this.handleChange("year")} type="text" />
             </div>
             <input type="submit" onClick={ (e) => this.handleSubmit(e) }
               value="Create Vehicle" />
           </form>
         </div>
       );
    }
}

export default withRouter(CreateVehicle);
