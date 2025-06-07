import React from "react";
import { Profile } from "./Profile";
import axios from "axios";
import { connect } from "react-redux";
import { setUserProfile } from "../../redux/profile-reducer";
import { useParams } from "react-router-dom";

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.userId || 1;
    axios.get(`https://dummyjson.com/users/${userId}`).then((response) => {
      this.props.setUserProfile(response.data);
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
