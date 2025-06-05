import React from "react";
import s from "./users.module.css";
import axios from "axios";

class Users extends React.Component {
  constructor(props) {
    super(props);
    axios.get("https://dummyjson.com/users").then((response) => {
      this.props.setUsers(response.data.users);
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.getUsers}>User</button>
        {this.props.users.map((u) => (
          <div key={u.id} className={s.userContainer}>
            <span>
              <div>
                <img
                  src={u.image != null ? u.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJaa44hakF5skS3g1dAqjMEuMAR6MgAetFw&s"}
                  alt=""
                  className={s.usersPhoto}
                />
              </div>

              <div>
                {!u.followed ? (
                  <button
                    onClick={() => {
                      this.props.follow(u.id);
                    }}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      this.props.unfollow(u.id);
                    }}
                  >
                    Unfollow
                  </button>
                )}
              </div>
            </span>
            <span className={s.userInfoContainer}>
              <span className={s.userContext}>
                <div>{u.firstName}</div>
                <div>{u.company.name}</div>
              </span>
              <span>
                <div>{u.address.city}</div>
                <div>{u.address.country}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
