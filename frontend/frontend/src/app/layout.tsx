"use client"

import "./globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { SnackbarProvider } from 'notistack';
import FireBaseErrorWrapper from "@/component/firbase-error-layout/firebase-error-comp";
import { PersistGate } from "redux-persist/lib/integration/react";
import { StyledEngineProvider } from "@mui/material";
import HeaderComp from "@/component/header-comp/header-comp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
                <FireBaseErrorWrapper>
                  {children}
                </FireBaseErrorWrapper>
              </SnackbarProvider>
            </PersistGate>
          </Provider>
        </StyledEngineProvider>
      </body>
    </html>
  );
}
