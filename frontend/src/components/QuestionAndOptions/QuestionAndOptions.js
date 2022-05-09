import {Answer, ButtonRow, ContentWithBackground, QuestionCard} from "./QuestionAndOptionsStyle";
import {Button, Col, Row} from "react-bootstrap";

function QuestionAndOptions({props}) {
  const {category, answers, points, content, type} = props;

  return (
      <ContentWithBackground>
          <Row style={{height: "80vh"}}>
              <Col xs={8}>
                  <QuestionCard>
                      <div>{category}</div>
                      <div>
                          <p>{content}</p>
                      </div>
                      <div>Punkty: {points}</div>
                  </QuestionCard>
              </Col>
              <Col xs={4} className={'p-0'}>
                  {answers.map(answer =>
                      <Answer key={answer}>
                          <Col xs={1}>
                              <input type={ type === "closed" ? "radio" : "checkbox"}/>
                              <span className='checkmark'/>
                          </Col>
                          <Col xs={11}>
                              {answer}
                          </Col>
                      </Answer>
                  )}
                  <ButtonRow>
                      <Button>Wyślij</Button>
                  </ButtonRow>
              </Col>
          </Row>
      </ContentWithBackground>
  );
}

export default QuestionAndOptions;
