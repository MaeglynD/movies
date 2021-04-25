/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.params = config.params || {};
    config.params.api_key = '9474cd60ea1ba8d666b0d83ea00c3b5a';
  });
}
