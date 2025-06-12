import { compose } from "redux";
import { withRouter } from "../../HOC/withRouter";
import { sendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    newMessageBody: state.newMessageBody,
    isAuth: state.auth.isAuth,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    sendMessage: () => {
      dispatch(sendMessageCreator());
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Dialogs);
