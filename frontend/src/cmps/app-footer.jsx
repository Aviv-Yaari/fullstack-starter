
import React from 'react'
import { connect } from 'react-redux'

import { addToCart, removeFromCart, checkout } from '../store/car.actions'
import { UserMsg } from './user-msg.jsx'

class _AppFooter extends React.Component {

    state = {
        isCartShown: false,
    }

    componentDidMount() { }

    removeFromCart = (carId) => {
        this.props.removeFromCart(carId)
    }
    checkout = () => {
        this.props.checkout();
    }
    get cartTotal() {
        return this.props.cart.reduce((acc, car) => acc + car.price, 0)
    }

    render() {
        const { isCartShown } = this.state
        const { count, cart } = this.props;
        return (
            <footer className="app-footer">
                <p>
                    coffeerights 2021 - count: {count}
                </p>
                {cart.length > 0 &&
                    <h5>
                        <span>{cart.length}</span> Products in your Cart
                        <button className="btn-link" onClick={(ev) => {
                            ev.preventDefault();
                            this.setState(prevState => ({ isCartShown: !prevState.isCartShown }))
                        }}>
                            ({(isCartShown) ? 'hide' : 'show'})
                        </button>
                    </h5>
                }
                {isCartShown && cart.length > 0 && <section className="cart" >
                    <h5>Your Cart</h5>
                    <ul>
                        {
                            cart.map((car, idx) => <li key={idx}>
                                <button onClick={() => {
                                    this.removeFromCart(car._id)
                                }}>x</button>
                                {car.vendor}
                            </li>)
                        }
                    </ul>
                    <p>Total: ${this.cartTotal.toLocaleString()} </p>
                    <button onClick={this.checkout}>Checkout</button>
                </section>}
                <UserMsg />
            </footer>
        )
    }
}


function mapStateToProps(state) {
    return {
        count: state.userModule.count,
        cart: state.carModule.cart
    }
}

const mapDispatchToProps = {
    checkout,
    addToCart,
    removeFromCart
}

export const AppFooter = connect(mapStateToProps, mapDispatchToProps)(_AppFooter)