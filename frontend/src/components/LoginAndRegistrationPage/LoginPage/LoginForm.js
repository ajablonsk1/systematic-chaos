import React from 'react';
import { Formik } from 'formik';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FormCol } from '../FormCol';
import { login } from '../../../actions/auth';
import { connect } from 'react-redux';

function LoginForm(props) {
    const { dispatch } = props;

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validate={values => {
                const errors = {};
                if (!values.email) errors.email = 'Pole wymagane.';
                if (!values.password) errors.password = 'Pole wymagane';
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(login(values)); // that should be enought
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, values, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Container>
                        <Row className="mx-auto">
                            {FormCol('Email', 'email', 'email')}
                            {FormCol('Hasło', 'password', 'password')}
                        </Row>
                        <Row className="mt-4 d-flex justify-content-center">
                            <Col sm={12} className="d-flex justify-content-center mb-2">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        backgroundColor: 'var(--button-green)',
                                        borderColor: 'var(--button-green)',
                                    }}
                                >
                                    {isSubmitting ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                        />
                                    ) : (
                                        <span>Zaloguj</span>
                                    )}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            )}
        </Formik>
    );
}

function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(LoginForm);
