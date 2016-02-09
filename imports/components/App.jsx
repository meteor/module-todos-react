import React from 'react';

const App = ({ loading, lists }) => (
  <div>
    <h1>App!</h1>
    <p>{loading ? 'loading...' : ''}</p>
    <ul>
      {lists.map((list, i) => {
        return <li key={i}>{list.name}</li>;
      })}
    </ul>
  </div>
);

export default App;
