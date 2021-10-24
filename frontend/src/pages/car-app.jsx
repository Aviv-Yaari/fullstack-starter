import React from 'react'
import { connect } from 'react-redux'


import { loadCars, onAddCar, onEditCar, onRemoveCar, addToCart } from '../store/car.actions.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

class _CarApp extends React.Component {
    state = {
    }
    componentDidMount() {
        this.props.loadCars()
    }

    onRemoveCar = (carId) => {
        this.props.onRemoveCar(carId)
    }
    onAddCar = () => {
       this.props.onAddCar()
    }
    onEditCar = (car) => {
        const price = +prompt('New price?')
        const carToSave = { ...car, price }
        this.props.onEditCar(carToSave)
    }
    addToCart = (car) => {
        console.log(`Adding ${car.vendor} to Cart`)
        this.props.addToCart(car)
        showSuccessMsg('Added to Cart')
    }
    render() {
        const { cars } = this.props
        return (
            <div>
                <h3>Cars App</h3>
                <main>
                    <button onClick={this.onAddCar}>Add Car ⛐</button>
                    <ul className="car-list">
                        {cars.map(car =>
                            <li className="car-preview" key={car._id}>
                                <h4>{car.vendor}</h4>
                                <h1>⛐</h1>
                                <p>Price: <span>${car.price.toLocaleString()}</span></p>
                                <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                                <div>
                                    <button onClick={() => {
                                        this.onRemoveCar(car._id)
                                    }}>x</button>
                                    <button onClick={() => {
                                        this.onEditCar(car)
                                    }}>Edit</button>
                                </div>
                                <button className="buy" onClick={() => {
                                    this.addToCart(car)
                                }}>Add to Cart</button>

                            </li>)}
                    </ul>
                </main>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        cars: state.carModule.cars
    }
}
const mapDispatchToProps = {
    loadCars,
    onRemoveCar,
    onAddCar,
    onEditCar,
    addToCart
}


export const CarApp = connect(mapStateToProps, mapDispatchToProps)(_CarApp)