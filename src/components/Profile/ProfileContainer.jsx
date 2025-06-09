import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { getUserByUrlId } from "../../redux/profile-reducer";
import { withRouter } from "../../HOC/withRouter ";
import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.params.userId || 1;
    if (this.props.isAuth) {
      this.props.getUserByUrlId(userId);
    }
  }

  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
});

export default compose(connect(mapStateToProps, { getUserByUrlId }), withRouter)(ProfileContainer);
