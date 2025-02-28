import React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';

import App from './App'

// Dynamically create the HTML root element
const root_element = document.createElement('div');
root_element.id = 'root';
document.body.appendChild(root_element);


/* hCaptcha integration 
const hcaptcha_script = document.createElement('script')
hcaptcha_script.src = "https://js.hcaptcha.com/1/api.js"
hcaptcha_script.async = true
hcaptcha_script.defer = true
document.head.appendChild(hcaptcha_script)


hcaptcha_script.onload = () => {
    console.log('LOADED HCAPTCHA SCRIPT!!!')
*/

// Create the ReactDOM root
const root_app = createRoot(document.getElementById('root') as HTMLElement); // Target the existing root div

root_app.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

