import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const withRouter = (Component) => {
  return (props) => {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (props.isAuth === false) {
        navigate("/login");
      }
    }, [props.isAuth, navigate]);

    return <Component {...props} params={params} />;
  };
};
