import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./operations";
import { getAuthState } from "./selectors"


class LogoutForm extends Component {

    static propTypes = {
        logoutUser: PropTypes.func.isRequired
    };

    // 初期化
    constructor(props) {
        super(props)
        this.state = {
            auth: this.props.authenticated,
            token: this.props.token
        }
    }


    // 変更されようとしているpropsと現在のstateを代入
    static getDerivedStateFromProps(nextProps, prevState) {

    }


    // コンポーネントにマウント
    componentDidMount() {

    }

    render() {
        return (
            <h2>Sorry to see you go...</h2>
        );
    }
}

export default connect(null, { logoutUser })(LogoutForm);

// export default connect(mapStateToProps, { logoutUser })(LogoutForm);

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { logoutUser } from "./operations";

// class Logout extends Component {

//     static propTypes = {
//         logoutUser: PropTypes.func.isRequired
//     };

//     componentDidMount() {
//         this.props.logoutUser();
//     }

//     render() {
//         return (
//             <h2>Sorry to see you go...</h2>
//         );
//     }
// }

// export default connect(null, { logoutUser })(Logout);