import React, { Component } from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Text from 'hometown-components-dev/lib/TextHtV1';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FormInput from "hometown-components-dev/lib/FormsHtV1/FormInputHtV1";

import { validateEmail } from "utils/validation";
import { sendData } from "redux/modules/services";
import { SUBSCRIPTION as SUBSCRIPTION_API } from "helpers/apiUrls";

const signup = require('../../../static/smartsters/signup.png');
const Arrow = require('../../../static/smartsters/right-arrow.png');

const mapStateToProps = ({ services }) => ({
    subscribe: services.footer
});

class Signup extends React.Component {

    state = {
        email: "",
        emailError: false,
        emailErrorMessage: "Please Enter a Valid Email",
        already: false
    };

    componentWillReceiveProps(nextProps) {
        const { loaded, loading } = nextProps.subscribe;
        const { already } = this.state;
        if (loaded && !loading && !already) {
            this.setState({
                email: "",
                already: true
            });
        }
    }

    onChangeEmail = e => {
        const {
            target: { value }
        } = e;
        const checkError = !validateEmail(value);
        this.setState({
            email: value,
            emailError: checkError
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { sendFormData } = this.props;
        const { email } = this.state;
        const emailError = !validateEmail(email);
        if (emailError) {
            return this.setState({
                emailError
            });
        }
        const data = {
            email
        };
        sendFormData(SUBSCRIPTION_API, data, "footer");
    };

    render() {
        const { email, emailError, emailErrorMessage, already } = this.state;
        return (
            <Div style={{ width: '100%', margin: '30px auto', background: '#F6C743' }}>
                <Div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%', padding: '20px 0px', margin: '0 auto' }}>
                    <Div >
                        <Image src={signup} alt='text' style={{ width: '80%' }} />
                    </Div>
                    <Div >
                        {!already ? (
                            <form onSubmit={this.handleSubmit} >
                                <div style={{ display: 'flex' }}>
                                    <input
                                        placeholder="Email"
                                        onChange={this.onChangeEmail}
                                        value={email}
                                        type="text"
                                        style={{ width: "500px", background: 'white', border: '1px solid white', outline: 'none', height: '50px', fontSize: '16px', paddingLeft: '20px' }} />

                                    <Button onClick={this.handleSubmit} style={{ background: 'white', height: '50px' }}><Image src={Arrow} alt='arrow' style={{ width: "30px" }} /></Button>
                                </div>
                                {emailError && (
                                    <div style={{ color: "#dc3545", padding: "3px", fontSize: "13px" }}>
                                        {emailErrorMessage}
                                    </div>
                                )}
                            </form>
                        ) : (
                            <Text
                                color="green"
                                fontSize="0.8rem"
                                mt="0"
                                mb="0"
                                lh="2"
                                ta="left"
                            >
                                You have been successfully subscribed
                            </Text>
                        )}
                    </Div>
                </Div>
            </Div>
        )
    }
}

Signup.defaultProps = {
    subscribe: {}
};

Signup.propTypes = {
    sendFormData: PropTypes.func.isRequired,
    subscribe: PropTypes.object
};
export default connect(mapStateToProps, { sendFormData: sendData })(Signup);


