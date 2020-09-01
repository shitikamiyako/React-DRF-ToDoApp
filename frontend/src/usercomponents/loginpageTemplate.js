import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// # Page Component
import LoginForm from './loginform';

const useStyles = makeStyles(theme => ({
    const: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(4),
    }
}));

const LoginPageTemplate = props => {
    const classes = useStyles();
    return (
        <Fragment>
            <div className="{classes content}">
                <LoginForm login={props.login}/>
            </div>
        </Fragment>
    );
}

export default LoginPageTemplate;