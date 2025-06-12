import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { getUserByUrlId, updateStatus } from "../../redux/profile-reducer";
import { withRouter } from "../../HOC/withRouter";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.params.userId || 1;
    if (this.props.isAuth) {
      this.props.getUserByUrlId(userId);
    }
  }

  render() {
    return <Profile {...this.props} status={this.props.status} updateStatus={this.props.updateStatus} />;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
  status: state.profilePage.status,
});

export default compose(connect(mapStateToProps, { getUserByUrlId, updateStatus }), withRouter)(ProfileContainer);
