// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import { Provider } from 'react-redux'
// import store from './store/store.ts'
// import AppContextProvider from './pages/navbar/MyBooks/context/appContext.tsx'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <Provider  store={store}>
//       <AppContextProvider>
//           <App />
//       </AppContextProvider>
//     </Provider>
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './pages/navbar/MyBooks/context/authContext';
import { TokenProvider } from './pages/navbar/login/TokenContext';

ReactDOM.render(
  <React.StrictMode>
    <TokenProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
    </TokenProvider>
  </React.StrictMode>,
  document.getElementById('root')
);