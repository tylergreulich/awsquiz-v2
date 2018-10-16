import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from 'src/screens/Home/Home';

export const Routes = () => (
  <BrowserRouter>
    <>
      <Route exact={true} path="/" component={Home} />
    </>
  </BrowserRouter>
);
