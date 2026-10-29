import React from 'react';
import router from './app.routes.jsx';

import {RouterProvider} from 'react-router-dom';
import {Provider} from 'react-redux';


function App() {
    return(
        <RouterProvider router={router} />
    );
}

export default App;