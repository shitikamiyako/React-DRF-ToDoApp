import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators"

import { renderField, renderError } from "../utils/renderUtils";
import { logoutUser } from "./operations";
import Cookies from 'js-cookie';

class LogoutForm extends Component {

        static propTypes = {
            ...propTypes
        };

        render() {
            const { handleSubmit, error } = this.props;

            return (
                <div className="row justify-content-center">

                    <form
                        className="col col-sm-4 card mt-5 p-2"
                        onSubmit={handleSubmit}
                    >
                        <fieldset className="form-group">
                            {renderError(error)}
                            <button action="submit" className="btn btn-primary">Logout</button>
                        </fieldset>

                        <p>Not registered? <Link to="/signup">Signup Here!</Link></p>
                        <Link to="/reset_password">forgot password?</Link>
                    </form>
                </div>
            )
        }
}

export default reduxForm({
    form: "LogoutForm",
    onSubmit: logoutUser
})(LogoutForm);
