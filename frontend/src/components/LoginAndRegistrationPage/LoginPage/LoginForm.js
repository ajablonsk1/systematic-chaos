import React from 'react';
import { ErrorMessage, Formik, Field } from 'formik';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';

export default function LoginForm() {
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
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, values, errors }) => (
                <Form>
                    <Container>
                        <Row className="mx-auto">
                            {/* //TODO: pomyśleć o funkcji generującej Col */}
                            <Col className="form-group" xs={12}>
                                <h6>Email</h6>
                                <Field className="form-control" type="email" name="email" />
                                <ErrorMessage name="email" component="div">
                                    {msg => <div style={{ color: 'var(--font-color)' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
                            <Col className="form-group" xs={12}>
                                <h6>Hasło</h6>
                                <Field className="form-control" type="password" name="password" />
                                <ErrorMessage name="password" component="div">
                                    {msg => <div style={{ color: 'var(--font-color)' }}>{msg}</div>}
                                </ErrorMessage>
                            </Col>
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
                                        <span>Załóż konto</span>
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
