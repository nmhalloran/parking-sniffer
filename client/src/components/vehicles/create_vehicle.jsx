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
    // debugger
    e.preventDefault();
    this.props
      .createVehicle(this.state)
      .then(res =>
        this.props.history.push(`/vehicles/${res.vehicle.data.vehicles[0]._id}`)
      );
  }

  handleChange(val) {
    return e => {
      if (val === "vehicle_type") {
        this.state.vehicle_type = e.currentTarget.value;
      } else if (val === "plate_no") {
        this.state.plate_no = e.currentTarget.value;
      } else if (val === "color") {
        this.state.color = e.currentTarget.value;
      } else if (val === "year") {
        this.state.year = e.currentTarget.value;
      } else if (val === "model") {
        this.state.model = e.currentTarget.value;
      }
      this.setState(this.state);
    };
  }

  render() {
    return (
      <div className="showVehicle">
        <div className="showVehicle-Info">
          <div className="vehicle-Info">
            <h3>Create a new Vehicle</h3>
            <div className="vehicle-create-body">
              <form>
                <div className="vehicle-check-box">
                  <div>
                    <label> Vehicle Type</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="motorcycle"
                      onClick={this.handleChange("vehicle_type")}
                      name="vehicletype"
                      value="motorcycle"
                    />
                    <label className="checkboxes" htmlFor="motorcycle">
                      Motorcycle
                    </label>

                    <input
                      type="checkbox"
                      id="compact"
                      onClick={this.handleChange("vehicle_type")}
                      name="vehicletype"
                      value="compact"
                    />
                    <label className="checkboxes" htmlFor="compact">
                      Compact
                    </label>

                    <input
                      type="checkbox"
                      id="sedan"
                      onClick={this.handleChange("vehicle_type")}
                      name="vehicletype"
                      value="sedan"
                    />
                    <label className="checkboxes" htmlFor="fullsize">
                      Sedan
                    </label>

                    <input
                      type="checkbox"
                      id="truck"
                      onClick={this.handleChange("vehicle_type")}
                      name="vehicletype"
                      value="truck"
                    />
                    <label className="checkboxes" htmlFor="truck">
                      Truck
                    </label>
                  </div>
                </div>
                <div className="rest">
                  <div>
                    <span className="create-Labels">
                      <label> Plate No </label>
                    </span>
                    <input
                      onChange={this.handleChange("plate_no")}
                      type="text"
                    />
                  </div>
                  <div>
                    <span className="create-Labels">
                      <label> Color </label>
                    </span>
                    <input onChange={this.handleChange("color")} type="text" />
                  </div>
                  <div>
                    <span className="create-Labels">
                      <label> Model </label>
                    </span>
                    <input onChange={this.handleChange("model")} type="text" />
                  </div>
                  <div>
                    <span className="create-Labels">
                      <label> Year </label>
                    </span>
                    <input onChange={this.handleChange("year")} type="text" />
                  </div>
                </div>
                <div className="vehicle-info-button">
                  <button onClick={e => this.handleSubmit(e)} value="">
                    Create Vehicle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateVehicle);
