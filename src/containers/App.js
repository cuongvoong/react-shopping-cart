import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import store from "../store";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../components/home/Home";
import Product from "./Product";
import Error from "../components/error/Error";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { connect } from "react-redux";
import { Elements, StripeProvider } from "react-stripe-elements";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StripeProvider apiKey="pk_test_FG2AIlJbHuPKn7ouwmIb50Rb">
          <Router>
            <div className="App">
              <Header
                totalItems={this.props.cart.totalItems}
                isSideDrawerOpen={true}
              />
              <div id="content" className="container-fluid">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/products" component={Product} />
                  <Route path="/cart" component={Cart} />
                  <Elements>
                    <Route
                      path="/checkout"
                      render={props => (
                        <Checkout
                          {...props}
                          totalItems={this.props.cart.totalItems}
                        />
                      )}
                    />
                  </Elements>
                  <Route component={Error} />
                </Switch>
              </div>
            </div>
          </Router>
        </StripeProvider>
      </Provider>
    );
  }
}

App.propTypes = {
  cart: PropTypes.shape({
    addedItemIds: PropTypes.array.isRequired,
    quantityById: PropTypes.object.isRequired,
    totalItems: PropTypes.number.isRequired
  })
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  {}
)(App);
