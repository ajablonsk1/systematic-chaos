import React from 'react';
import { Formik } from 'formik';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { FormCol } from '../LoginAndRegistrationPage/FormCol';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';
import { addGroup, AddGroupResults } from '../../storage/groupsTable';

export default function GroupAdditionForm() {
    const navigate = useNavigate();

    const backToGroupsPage = () => {
        navigate(`${PageRoutes.GROUPS}`);
    };

    return (
        <Formik
            initialValues={{
                name: '',
                code: '',
            }}
            validate={values => {
                const errors = {};
                if (!values.name) errors.name = 'Pole wymagane';
                if (!values.code) errors.code = 'Pole wymagane';
                return errors;
            }}
            onSubmit={(values, { setSubmitting, setFieldError }) => {
                const result = addGroup(values.name, values.code);

                if (result === AddGroupResults.SUCCESS) {
                    backToGroupsPage();
                }
                else {
                    result.forEach(error => {
                        switch (error) {
                            case AddGroupResults.NAME_TAKEN_ERROR:
                                setFieldError("name", error);
                                break;
                            case AddGroupResults.CODE_TAKEN_ERROR:
                                setFieldError("code", error);
                                break;
                            default:
                                break;
                        }
                    })
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, values, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Container>
                        <Row 
                            className="mx-auto"
                            style={{
                                width: "70%",
                            }}
                        >
                            {FormCol('Nazwa grupy', 'text', 'name')}
                            {FormCol('Kod grupy', 'text', 'code')}
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
                                        <span>Dodaj</span>
                                    )}
                                </Button>
                                <Button
                                    className="ml-3"
                                    onClick={backToGroupsPage}
                                    style={{
                                        backgroundColor: 'var(--font-color)',
                                        borderColor: 'var(--font-color)',
                                        color: `var(--dark-blue)`,
                                    }}
                                >
                                    Anuluj
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            )}
        </Formik>
    );
}
