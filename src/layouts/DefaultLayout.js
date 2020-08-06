import React from 'react';
import AddListItem from 'components/AddListItem/AddListItem';
import { Container } from '@material-ui/core'

const DefaultLayout = ({children}) => (
  <>
    <header>
      <Container>
        <AddListItem />
      </Container>
    </header>
    <main className="main">
      <Container>
        {children}
      </Container>
    </main>
  </>
);

export default DefaultLayout;