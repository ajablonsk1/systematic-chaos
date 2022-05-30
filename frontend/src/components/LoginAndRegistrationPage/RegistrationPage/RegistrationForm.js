import React, { useRef, useState } from 'react';
import { ErrorMessage, Formik, Field } from 'formik';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { HeroDescriptions, HeroImg, RegistrationLabelsAndTypes } from '../../../utils/constants';
import { Description, Info } from './RegistrationStyle';
import { validateConfirmPassword, validateEmail, validatePassword } from './validators';

export default function RegistrationForm({ isStudent }) {
    const [character, setCharacter] = useState('warrior');
    const description = useRef(null);
    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        passwordRepeat: '',
    };
    if (isStudent) {
        initialValues.code = '';
        initialValues.type = '';
    }

    const changeCharacter = event => {
        setCharacter(event.target.value);
    };

    // how to do it better ?
    const toggleDescription = () => {
        if (description.current.style.display === 'none') {
            description.current.style.display = 'flex';
        } else {
            description.current.style.display = 'none';
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={values => {
                const errors = {};
                if (!values.fullname) errors.fullname = 'Pole wymagane.';
                errors.email = validateEmail(values.email);
                errors.password = validatePassword(values.password);
                errors.passwordRepeat = validateConfirmPassword(
                    values.password,
                    values.passwordRepeat
                );

                if (isStudent) {
                    if (!values.code) errors.code = 'Pole wymagane';
                }
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
                            {Object.keys(initialValues).map((key, idx) => (
                                <Col className="form-group" md={6} key={idx}>
                                    <h6>{RegistrationLabelsAndTypes[key][0]}</h6>
                                    <>
                                        {key === 'type' ? (
                                            <div className="d-flex align-items-center">
                                                <Field
                                                    className="form-control"
                                                    as="select"
                                                    name="type"
                                                    onChange={changeCharacter}
                                                    value={character}
                                                >
                                                    <option id="warrior" value="warrior">
                                                        Wojownik
                                                    </option>
                                                    <option id="wizard" value="wizard">
                                                        Czarodziej
                                                    </option>
                                                    <option id="priest" value="priest">
                                                        Kapłan
                                                    </option>
                                                    <option id="rogue" value="rogue">
                                                        Łotrzyk
                                                    </option>
                                                </Field>
                                                <Info onClick={() => toggleDescription()}>i</Info>
                                                <Description
                                                    ref={description}
                                                    style={{ display: 'none' }}
                                                    className="align-items-center flex-column"
                                                >
                                                    {HeroDescriptions[character]} <br />
                                                    <img
                                                        src={HeroImg[character]}
                                                        alt={character}
                                                    />{' '}
                                                    <br />
                                                    <p onClick={() => toggleDescription()}>Ukryj</p>
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
