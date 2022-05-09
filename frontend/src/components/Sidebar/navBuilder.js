import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";


// TODO: add style
export function buildNavLink(to, content){
    return (
        <Nav.Link
            as={Link}
            key={to}
            to={to}
        >
            <span>{content}</span>
        </Nav.Link>
    );
}
