// router.js

export const States = {
  Home: 0,
  Entry: 1,
  Settings: 2
}

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(document,hash) {
  console.log(hash);
  if (hash.indexOf("#entry")>=0) {
    viewEntry(document,hash.substring(6));
    return;
  }
  if (hash === "#settings") {
    viewSettings(document);
    return; 
  }
  viewHomePage(document);
}


function viewSettings(document) {
  document.body.className="settings";
  document.title = "Settings";
}

function viewHomePage (document) {
  document.body.className="";
  document.title = "Home";
}

function viewEntry (document,id) {
  const journalEntry = document.getElementById(id);
  if (!journalEntry) {
    viewHomePage(document);
    return false;
  }
  document.title = "Entry #" + id;
  let entryPage = document.querySelector("entry-page");
  //Delete the <entry-page> and make a new one if it already has content
  if (entryPage.entry.content) {
    document.body.removeChild(entryPage);
    entryPage = document.createElement("entry-page");
    document.body.appendChild(entryPage);
  }
  entryPage.entry = journalEntry.entry;
  document.body.className = "single-entry";
}