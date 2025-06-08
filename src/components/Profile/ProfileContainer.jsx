import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import { useParams } from "react-router-dom";
import { usersApi } from "../../api/api";

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.userId || 1;
    usersApi.getUser(userId).then((data) => {
      this.props.setUserProfile(data);
    });
  }
  render() {
    return <Profile {...this.props} />;
  }
}
let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

const withURLDataContainerComponent = (props) => {
  const { userId } = useParams();
  return <ProfileContainer {...props} userId={userId} />;
};

export default connect(mapStateToProps, { setUserProfile })(withURLDataContainerComponent);
