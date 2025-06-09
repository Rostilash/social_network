import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const withRouter = (Component) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (!props.isAuth) {
        navigate("/login");
      }
    }, [props.isAuth, navigate]);
    if (!props.isAuth) return null;

    return <Component {...props} params={params} />;
  };
};
