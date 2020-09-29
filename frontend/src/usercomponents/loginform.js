import React, { Component } from "react";
// import PropTypes from "prop-types";
import { reduxForm, Field, propTypes } from "redux-form";
import { Link } from "react-router-dom";
import { required } from "redux-form-validators"

import { renderField, renderError } from "../utils/renderUtils";
import { loginUser } from "../usercomponents2/operations";
import Cookies from 'js-cookie';

var csrftoken = Cookies.get('csrftoken');


class LoginForm extends Component {

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
                    <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
                    <h4 className="text-md-center">Please Log In</h4>
                    <hr />

                    <fieldset className="form-group">
                        <Field name="username" label="username" component={renderField}
                            type="text" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>


                    <fieldset className="form-group">
                        <Field name="password" label="Password" component={renderField}
                            type="password" validate={[required({ message: "This field is required." })]}
                        />
                    </fieldset>

                    <fieldset className="form-group">
                        {renderError(error)}
                        <button action="submit" className="btn btn-primary">Login</button>
                    </fieldset>

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
    form: "LoginForm",
    onSubmit: loginUser
})(LoginForm);