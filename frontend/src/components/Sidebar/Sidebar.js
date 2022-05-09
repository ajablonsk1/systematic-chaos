import React from 'react';
import {buildNavLink} from "./navBuilder";


function Sidebar({link_titles}) {
    return (
        <div>
            {/*TODO e.g below:*/}
            {link_titles.map(([to, linkTitle]) => buildNavLink(to, linkTitle))}
        </div>
    );
}

export default Sidebar;
