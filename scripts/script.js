// script.js

import { router, States } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

if ('serviceWorker' in navigator) {
  window.addEventListener("load", event => {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let count = 0;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        count++;
        newPost.id = "entry" + count;
        newPost.entry = entry;
        newPost.addEventListener('click', event =>{
          location.hash = "view-" + newPost.id;
        })
        document.querySelector('main').appendChild(newPost);
      });
    });
});

//No History API necessary
window.addEventListener("hashchange", () => {
  setState(document,location.hash);
})

document.querySelector("header > img").addEventListener("click", e => {
  location.hash = "settings";
})