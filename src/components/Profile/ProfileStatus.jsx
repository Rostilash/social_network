import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({ status: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }

    console.log("Component did update");
  }
  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>{this.state.status || `----`}</span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input autoFocus onBlur={this.deactivateEditMode} onChange={this.onStatusChange} value={this.state.status} />
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
