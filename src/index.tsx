import React from "react";
import ReactDOM from "react-dom";

import I18next from "i18next";
import { initReactI18next } from "react-i18next";

import App from "./App/Index";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";

// Setup localization using i18next
I18next
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== "production",

    fallbackLng: "en",
    load: "languageOnly",

    backend: {
      loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
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
    ReactDOM.render(<App />, document.getElementById("root"));
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
