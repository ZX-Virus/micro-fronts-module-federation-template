import * as React from 'react';
import ReactDOM from 'react-dom';

import "./content-style.css";

export const ContentComponent = () => {
  return (
    <div className="container">
      This is React component
    </div>
  );
}

class MfContentElement extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<ContentComponent />, this);
    }
}

customElements.define('mf-react-element', MfContentElement);
