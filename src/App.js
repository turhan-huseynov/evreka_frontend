import React, { Component } from 'react';
import DatePickers from './Datepickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faPlusCircle, faArrowCircleRight, faBars, faPlay, faPause, faFileAlt, faCheck, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons'
import RouteList from './RouteList';
import Slider from './DiscreteSlider';
import Dropdown from './SimpleDropdown';
import Leaflet from './Leaflet';
import moment from 'moment';
import DummyDataGenerator from './DummyDataGenerator';

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      mapview: false,
      routelist: [
        { name: "13:30 Vardiyası", vehicle: "Fenertepe", time: "13:12", driver: "Tanır Nalbant", helper: "-", performance: "66/103", status: "Dispatched" },
        { name: "13:30 Vardiyası", vehicle: "Boğazköy", time: "13:11", driver: "Selçuk Yurt", helper: "-", performance: "78/85", status: "Finished" },
        { name: "07:30 Vardiyası", vehicle: "Başakşehir", time: "07:30", driver: "Emri Akça", helper: "-", performance: "108/148", status: "Finished" },
      ],
      play: false,
      selectedVehicle: null,
      selectedFrame: 0,
      selectedTime: 1562900000,
      dummyVehicleData: [
        {
          time: 1562900000,
          vehicles: [
            {
              name: 'Fenertepe',
              active: 'move',
              data: { position: [39.888, 32.796], collected: 0, remaining: 26 }
            },
            {
              name: 'Kayaşehir',
              active: 'move',
              data: { position: [39.893, 32.789], collected: 0, remaining: 20 }
            },
          ],
          dummyPackageData: [
            {
              name: 'Package 1',
              amount: 1,
              position: [39.888, 32.796],
              collected: false
            },
            {
              name: 'Package 2',
              amount: 8,
              position: [39.88728, 32.78265],
              collected: false
            },
            {
              name: 'Package 3',
              amount: 25,
              position: [39.895, 32.787],
              collected: false
            },
            {
              name: 'Package 4',
              amount: 12,
              position: [39.896, 32.794],
              collected: false
            }
          ]
        },
        {
          time: 1562903600,
          vehicles: [
            {
              name: 'Fenertepe',
              active: 'pending',
              data: { position: [39.89271, 32.78885], collected: 1, remaining: 25 }
            },
            {
              name: 'Kayaşehir',
              active: 'move',
              data: { position: [39.88759, 32.78355], collected: 0, remaining: 20 }
            },
          ],
          dummyPackageData: [
            {
              name: 'Package 1',
              amount: 1,
              position: [39.888, 32.796],
              collected: true
            },
            {
              name: 'Package 2',
              amount: 8,
              position: [39.88728, 32.78265],
              collected: false
            },
            {
              name: 'Package 3',
              amount: 25,
              position: [39.895, 32.787],
              collected: false
            },
            {
              name: 'Package 4',
              amount: 12,
              position: [39.896, 32.794],
              collected: false
            }
          ]
        },
        {
          time: 1562907200,
          vehicles: [
            {
              name: 'Fenertepe',
              active: 'move',
              data: { position: [39.895, 32.787], collected: 1, remaining: 25 }
            },
            {
              name: 'Kayaşehir',
              active: 'move',
              data: { position: [39.896, 32.795], collected: 8, remaining: 12 }
            },
          ],
          dummyPackageData: [
            {
              name: 'Package 1',
              amount: 1,
              position: [39.888, 32.796],
              collected: true
            },
            {
              name: 'Package 2',
              amount: 8,
              position: [39.88728, 32.78265],
              collected: true
            },
            {
              name: 'Package 3',
              amount: 25,
              position: [39.895, 32.787],
              collected: false
            },
            {
              name: 'Package 4',
              amount: 12,
              position: [39.896, 32.794],
              collected: false
            }
          ]
        },
        {
          time: 1562909000,
          vehicles: [
            {
              name: 'Fenertepe',
              active: 'inactive',
              data: { position: [39.89670, 32.77699], collected: 26, remaining: 0 }
            },
            {
              name: 'Kayaşehir',
              active: 'inactive',
              data: { position: [39.89684, 32.77502], collected: 20, remaining: 0 }
            },
          ],
          dummyPackageData: [
            {
              name: 'Package 1',
              amount: 1,
              position: [39.888, 32.796],
              collected: true
            },
            {
              name: 'Package 2',
              amount: 8,
              position: [39.88728, 32.78265],
              collected: true
            },
            {
              name: 'Package 3',
              amount: 25,
              position: [39.895, 32.787],
              collected: true
            },
            {
              name: 'Package 4',
              amount: 12,
              position: [39.896, 32.794],
              collected: true
            }
          ]
        }
      ]
    }
  }

  componentDidUpdate() {
    var sliderMarks = document.getElementsByClassName('MuiSlider-mark');
    var div = sliderMarks[sliderMarks.length - 1];
    if (div)
      div.className += ' last-element'
  }

  changeVehicle = (driver, vehicle) => {
    this.state.routelist.forEach((newRoute, index) => {
      if (newRoute.driver === driver) {
        let newState = { ...this.state }
        newState.routelist[index].vehicle = vehicle
        this.setState({ ...newState })
      }
    })
  }

  addRandomUser = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${Math.floor(Math.random() * 10) + 1}`)
      .then(response => response.json())
      .then(json => {
        let newState = { ...this.state }
        newState.routelist.push(DummyDataGenerator(json))
        this.setState(newState)
      })
      .catch(err => console.log(err))
  }

  render() {
    var marks = this.state.dummyVehicleData.map((dataPerTime, index) => {
      return { key: index, value: dataPerTime.time, label: moment.unix(dataPerTime.time).format("HH:mm") }
    })

    return (
      <div className="App m-10">
        {/* Dashboard */}
        {!this.state.mapview ? <div style={{ margin: '10px 5px' }}>
          <div className="lc" style={{ justifyContent: 'space-between' }}>
            <div className='lc'>
              <FontAwesomeIcon className='pr-10 cursor' color="dimgray" size="lg" icon={faMap} onClick={() => this.setState({ mapview: true })} />
              <DatePickers defaultValue={this.state.date}></DatePickers>
              <FontAwesomeIcon color="dimgray" size="lg" icon={faArrowCircleRight} />
            </div>
            <div className="cursor">
              <FontAwesomeIcon color="green" size="2x" icon={faPlusCircle} onClick={this.addRandomUser} />
            </div>
          </div>

          <div style={{ margin: '20px 0 10px' }}>
            RouteList
          </div>
          <div className='lc' style={{ fontSize: '11px', margin: '10px 0 20px' }}>
            <FontAwesomeIcon color="dimgray" size="lg" icon={faFileAlt} style={{ paddingRight: '2px' }} />
            Create Report
          </div>
          <RouteList routelist={this.state.routelist} changeVehicle={(driver, newVehicle) => this.changeVehicle(driver, newVehicle)}></RouteList>
        </div> : null}

        {/* Map view */}
        {this.state.mapview ? <div style={{ padding: '8px 0', background: 'white', overflowY: 'hidden' }}>
          <Leaflet
            selectedVehicle={this.state.selectedVehicle}
            dummyVehicleData={this.state.dummyVehicleData}
            selectedFrame={this.state.selectedFrame}
          >
          </Leaflet>
          <div className='z-up lc' style={{ top: 28, left: 38 }}>
            <FontAwesomeIcon className='pr-10 cursor' icon={faBars} onClick={() => this.setState({ mapview: false })} />
            <DatePickers defaultValue={this.state.date} ></DatePickers>
            <FontAwesomeIcon color="dimgray" size="lg" icon={faArrowCircleRight} />
          </div>
          <div className="z-up left-box" style={{ bottom: 35, left: 26, width: '20vw' }}>
            <div className="box box-helper br1" style={{ width: '100%', height: '75px' }}>
              <div className="flex-sb">
                <div className="w-40 lc" style={{ justifyContent: "space-evenly" }}>
                  <FontAwesomeIcon color='dimgray' size="lg" icon={faCheck} />
                  {this.state.dummyVehicleData[this.state.selectedFrame].dummyPackageData.reduce((total, num) => num.collected ? total + num.amount : total, 0)}
                </div>
                <div className="w-60 lc jc-center" style={{ fontSize: '70%' }}>Collected</div>
              </div>
              <div className="flex-sb">
                <div className="w-40 lc" style={{ justifyContent: "space-evenly" }}>
                  <FontAwesomeIcon color='rgb(68, 82, 117)' size="lg" icon={faTimes} />
                  {this.state.dummyVehicleData[this.state.selectedFrame].dummyPackageData.reduce((total, num) => num.collected ? total : total + num.amount, 0)}
                </div>
                <div className="w-60 lc jc-center" style={{ fontSize: '70%' }}>Remaining</div>
              </div>
            </div>
            <div className="box br1 lc jc-center" style={{ width: '100%', height: '40px', marginTop: '5px' }}>
              Map
            </div>
          </div>
          <div className="z-up right-box" style={{ bottom: 35, right: 26, width: '20vw', }}>
            <div className="box br1" style={{ height: '150px' }}>
              <div className="lc p-10" style={{ justifyContent: 'space-between' }}>
                <FontAwesomeIcon color='darkgray' size="lg" icon={faFilter} />
                <div style={{ width: '50%', fontSize: '12px' }}>
                  <div style={{ fontWeight: '600', paddingBottom: '5px' }}>
                    Filter
                </div>
                  <div>
                    Result: {this.state.dummyVehicleData[this.state.selectedFrame].dummyPackageData.length} Bin
                </div>
                </div>
              </div>
              <Dropdown
                vehicles={this.state.dummyVehicleData[this.state.selectedFrame].vehicles}
                selectedVehicle={this.state.selectedVehicle}
                selectVehicle={(vehicle) => this.setState({ selectedVehicle: vehicle })}
              >
              </Dropdown>
              <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <div style={{ textAlign: 'center', width: '100px' }}>
                  <img src={require("./img/bus-green.png")} height="30px" alt="Bus active:move" />
                  <div style={{ fontSize: '10px' }}>
                    Active - On the Move
                  </div>
                </div>
                <div style={{ textAlign: 'center', width: '100px' }}>
                  <img src={require("./img/bus-red.png")} height="30px" alt="Bus active:pending" />
                  <div style={{ fontSize: '10px' }}>
                    Active - Pending
                  </div>
                </div>
                <div style={{ textAlign: 'center', width: '100px' }}>
                  <img src={require("./img/bus-gray.png")} height="30px" alt="Bus inactive" />
                  <div style={{ fontSize: '10px' }}>
                    Inactive
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="z-up slider" style={{ bottom: 35, left: '24vw', width: '50vw' }}>
            <div className="box br1" style={{ display: 'flex', width: '103%', maxWidth: '100%', height: '70px', padding: '10px' }}>
              <FontAwesomeIcon className='pr-10' color="dimgray" size="lg" icon={!this.state.play ? faPlay : faPause} onClick={() => this.setState({ play: !this.state.play })} style={{ padding: '15px 30px 0 10px' }} />
              <Slider
                dummyVehicleData={this.state.dummyVehicleData}
                marks={marks}
                selectedFrame={this.state.selectedFrame}
                selectedTime={this.state.selectedTime}
                play={this.state.play}

                // Called when user manually use the slider
                handleSliderChange={(newValue) => {
                  var newFrame;
                  this.state.dummyVehicleData.forEach((element, index) => {
                    if (element.time === newValue) {
                      newFrame = index
                      this.setState({ selectedFrame: newFrame })
                    }
                  });
                  this.setState({ selectedTime: newValue })
                }}
                handleFrameChange={(newValue) => this.setState({ selectedFrame: newValue })}
                handlePlayChange={() => this.setState({ play: !this.state.play })}
              ></Slider>
            </div>
          </div>

        </div> : null}
      </div>
    );
  }
}

export default App;