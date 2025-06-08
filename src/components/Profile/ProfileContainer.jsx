import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { getUserByUrlId } from "../../redux/profile-reducer";
import { useParams } from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.userId || 1;
    this.props.getUserByUrlId(userId);
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

export default connect(mapStateToProps, { getUserByUrlId })(withURLDataContainerComponent);
