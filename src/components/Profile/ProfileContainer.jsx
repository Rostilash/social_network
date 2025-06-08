import React, { useEffect } from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { getUserByUrlId } from "../../redux/profile-reducer";
import { useNavigate, useParams } from "react-router-dom";

const withHooks = (Component) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (!props.isAuth) {
        navigate("/login");
      }
    }, [props.isAuth, navigate]);

    return <Component {...props} params={params} />;
  };
};

class ProfileContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.params.userId || 1;
    this.props.getUserByUrlId(userId);
  }

  render() {
    return <Profile {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { getUserByUrlId })(withHooks(ProfileContainer));
