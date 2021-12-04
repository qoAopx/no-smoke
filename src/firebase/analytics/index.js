import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';

const analytics = firebase.analytics();

const screenView = (path) => {
  const app_name = process.env.VUE_APP_NAME;
  const event_name = firebase.analytics.EventName.SCREEN_VIEW;
  const event_value = {
    app_name: app_name,
    screen_name: path
  };
  // Google Analytics for Firebase
  // console.log(event_name, event_value);
  analytics.setCurrentScreen(path, { global: true });
  analytics.logEvent(event_name, event_value);
  return true;
};

const search = (search_term) => {
  const app_name = process.env.VUE_APP_NAME;
  const event_name = firebase.analytics.EventName.SEARCH;
  const event_value = {
    app_name: app_name,
    search_term: search_term
  };
  // Google Analytics for Firebase
  //console.log(event_name, event_value);
  analytics.logEvent(event_name, event_value);
  return true;
};

export default {
  screenView: screenView,
  search: search
};
