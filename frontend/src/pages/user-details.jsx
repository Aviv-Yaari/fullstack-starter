import React, { Component } from 'react'
import { connect } from 'react-redux'
import {loadAndWatchUser} from '../store/user.actions'

export class _UserDetails extends Component {
  
  async componentDidMount() {
    this.props.loadAndWatchUser(this.props.match.params.id)
  }

  render() {
    const {user} = this.props
    return (
      <section className="user-details">
        <h1>User Details</h1>
        {user && <div>
          <h3>
            {user.fullname}
          </h3>
          <pre>
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>}
      </section>
    )
  }
}



const mapStateToProps = state => {
  return {
    user: state.userModule.watchedUser
  }
}
const mapDispatchToProps = {
  loadAndWatchUser
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)
