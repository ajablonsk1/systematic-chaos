import React, { useRef, useState } from 'react';
import { ErrorMessage, Formik, Field } from 'formik';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FIELD_REQUIRED, HeroDescriptions, HeroImg, RegistrationLabelsAndTypes } from '../../../utils/constants';
import { Description, Info } from './RegistrationStyle';
import { validateConfirmPassword, validateEmail, validatePassword } from './validators';
import { register } from '../../../actions/auth';
import { AccountType, HeroType } from '../../../utils/userRole';
import { connect } from 'react-redux';

function RegistrationForm(props) {
    const [character, setCharacter] = useState(HeroType.WARRIOR);
    const description = useRef(null);
    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        passwordRepeat: '',
    };
    if (props.isStudent) {
        initialValues.invitationCode = '';
        initialValues.heroType = '';
    }

    const changeCharacter = event => {
        setCharacter(event.target.value);
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                const errors = {};
                if (!values.fullname) errors.fullname = FIELD_REQUIRED;
                else if (values.fullname.split(' ').length < 2)
                    errors.fullname = 'Podaj imię i nazwisko, pamiętaj o spacji';

                errors.email = validateEmail(values.email);
                errors.password = validatePassword(values.password);
                errors.passwordRepeat = validateConfirmPassword(
                    values.password,
                    values.passwordRepeat
                );

                if (props.isStudent) {
                    if (!values.invitationCode) errors.invitationCode = FIELD_REQUIRED;
                }

                // without this, errors contains keys with empty string which should not be considered errors
                Object.keys(errors).forEach(key => {
                    if (errors[key] === '') {
                        delete errors[key];
                    }
                });

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                values.firstName = values.fullname.split(' ').slice(0, -1).join(' ');
                values.lastName = values.fullname.split(' ').slice(-1).join(' ');
                values.accountType = props.isStudent ? AccountType.STUDENT : AccountType.PROFESSOR;
                values.heroType = props.isStudent ? character : null;
                props.dispatch(register(values));
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, values, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Container>
                        <Row className="mx-auto">
                            {Object.keys(initialValues).map((key, idx) => (
                                <Col className="form-group" md={6} key={idx}>
                                    <h6>{RegistrationLabelsAndTypes[key][0]}</h6>
                                    <>
                                        {key === 'heroType' ? (
                                            <div className="d-flex align-items-center">
                                                <Field
                                                    className="form-control"
                                                    as="select"
                                                    name="heroType"
                                                    onChange={changeCharacter}
                                                    value={character}
                                                >
                                                    {/*//TODO: mapper and variable */}
                                                    <option id="warrior" value={HeroType.WARRIOR}>
                                                        Wojownik
                                                    </option>
                                                    <option id="wizard" value={HeroType.WIZARD}>
                                                        Czarodziej
                                                    </option>
                                                    <option id="priest" value={HeroType.PRIEST}>
                                                        Kapłan
                                                    </option>
                                                    <option id="rogue" value={HeroType.ROGUE}>
                                                        Łotrzyk
                                                    </option>
                                                </Field>
                                                <Info>i</Info>
                                                <Description
                                                    ref={description}
                                                    style={{
                                                        display: 'none',
                                                    }}
                                                    className="align-items-center flex-column"
                                                >
                                                    {HeroDescriptions[character]}
                                                    <img src={HeroImg[character]} alt={character} />
                                                </Description>
                                            </div>
                                        ) : (
                                            <Field
                                                className="form-control"
                                                name={key}
                                                type={RegistrationLabelsAndTypes[key][1]}
                                            />
                                        )}
                                    </>

                                    <ErrorMessage name={key} component="div">
                                        {msg => (
                                            <div style={{ color: 'var(--font-color)' }}>{msg}</div>
                                        )}
                                    </ErrorMessage>
                                </Col>
                            ))}
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

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(RegistrationForm);
