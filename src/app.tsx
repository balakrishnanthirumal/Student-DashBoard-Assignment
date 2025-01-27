import { ThemeProvider } from 'src/theme/theme-provider';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import UserView from 'src/sections/user/view/user-view';
import { SignInView } from './sections/auth/sign-in-view';
import { SignUpView } from './sections/auth/sign-up-view';
import store from './store/store';

import MainLayout from './pages/Mainlayout';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Toaster />
        <Routes>
          <Route element={<MainLayout />}>
            {/* <Route index element={<UserView />} />  */}
            <Route path="login" element={<SignInView />} />
            <Route path="signup" element={<SignUpView />} />
            <Route path="/" element={<UserView />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}
