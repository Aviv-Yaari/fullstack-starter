import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadReviews, addReview, removeReview } from '../store/review.actions'
import { loadUsers } from '../store/user.actions.js'

class _ReviewApp extends Component {
  state = {
    reviewToEdit: {
      txt: '',
      aboutUserId: ''
    }
  }
  componentDidMount() {
    this.props.loadReviews()
    this.props.loadUsers()
  }

  handleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      reviewToEdit: {
        ...prevState.reviewToEdit,
        [name]: value
      }
    }))
  }

  addReview = async ev => {
    ev.preventDefault()
    const { reviewToEdit } = this.state
    if (!reviewToEdit.txt || !reviewToEdit.aboutUserId) return alert('All fields are required')
    await this.props.addReview(this.state.reviewToEdit)
    this.setState({ reviewToEdit: { txt: '', aboutUserId: '' } })
  }

  onRemove = async reviewId => {
    await this.props.removeReview(reviewId)
    // this.props.history.push('/login')
  }

  canRemove = review =>
    (review.byUser._id === this.props.loggedInUser?._id || this.props.loggedInUser?.isAdmin)

  render() {
    return (
      <div className="home">
        <h1>Reviews and Gossip</h1>
        {this.props.reviews && <ul className="review-list">
          {this.props.reviews.map(review => (
            <li key={review._id}>
              { this.canRemove(review) &&
                <button onClick={() => this.onRemove(review._id)}>X</button>}
              <p>
                About:
                <Link to={`user/${review.aboutUser._id}`}>
                  {review.aboutUser.fullname}
                </Link>
              </p>
              <h3>{review.txt}</h3>

              <p>
                By:
                <Link to={`user/${review.byUser._id}`}>
                  {review.byUser.fullname}
                </Link>
              </p>
            </li>
          ))}
        </ul>}
        {this.props.users && this.props.loggedInUser &&
          <form onSubmit={this.addReview}>
            <select
              onChange={this.handleChange}
              value={this.state.reviewToEdit.aboutUserId}
              name="aboutUserId"
            >
              <option value="">Select User</option>
              {this.props.users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.fullname}
                </option>
              ))}
            </select>
            <textarea
              name="txt"
              onChange={this.handleChange}
              value={this.state.reviewToEdit.txt}
            ></textarea>
            <button>Submit</button>
          </form>}
        <hr />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviewModule.reviews,
    users: state.userModule.users,
    loggedInUser: state.userModule.user
  }
}
const mapDispatchToProps = {
  loadReviews,
  loadUsers,
  addReview,
  removeReview
}

export const ReviewApp = connect(mapStateToProps, mapDispatchToProps)(_ReviewApp)
