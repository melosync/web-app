import I18next from "i18next";
import I18nextLanguageDetector from "i18next-browser-languagedetector";
import I18nextXhr from "i18next-xhr-backend";
import React from "react";
import ReactDOM from "react-dom";
import { initReactI18next } from "react-i18next";
import { Provider } from "react-redux";

import App from "./App/index_to_rename";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

// Setup localization using i18next
I18next
  // Detect lang from browser
  .use(I18nextLanguageDetector)
  // Load translation files
  .use(I18nextXhr)
  // Initialize react
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== "production",

    fallbackLng: "en",
    load: "languageOnly",

    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },

    nsSeparator: false,
    keySeparator: false,

    returnNull: false,
    returnEmptyString: false,

    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
  })
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
