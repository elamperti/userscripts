// ==UserScript==
// @name            Netflix Profile Auto-Picker
// @namespace       https://github.com/elamperti/userscripts
// @version         0.1
// @description     Auto select a profile for Netflix
// @author          Enrico Lamperti / Based on work by dracorp
// @match           https://www.netflix.com/*
// @require         https://openuserjs.org/src/libs/sizzle/GM_config.min.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_registerMenuCommand
// @updateURL       https://github.com/elamperti/userscripts/raw/master/userscripts/netflix-profile-picker.user.js
// @downloadURL     https://github.com/elamperti/userscripts/raw/master/userscripts/netflix-profile-picker.user.js
// @supportURL      https://github.com/elamperti/userscripts/issues
// @license         LGPL-3.0
// ==/UserScript==

'use strict';

console.log('[Netflix auto-picker] Initialized');

function napMain() {
  const uninitializedConfig = JSON.parse(GM_getValue('netflixProfilePicker', '{}'));
  const napProfileName = uninitializedConfig.napProfileName || '';
  const napAutoLoad = uninitializedConfig.napAutoLoad !== undefined ? uninitializedConfig.napAutoLoad : true;
  let profiles = [];

  for (let profile in unsafeWindow.netflix.falcorCache.profiles) {
    profiles.push(unsafeWindow.netflix.falcorCache.profiles[profile].summary.value.profileName);
  }

  GM_config.init({
    id: 'netflixProfilePicker',
    title: 'Netflix profile auto-picker config',
    fields: {
      napProfileName: {
        label: 'Profile',
        type: 'select',
        options: profiles,
        default: napProfileName,
        title: 'Which profile should be used by default?',
      },
      napAutoLoad: {
        type: 'checkbox',
        default: napAutoLoad,
        label:'Autoload',
        title:'Load chosen profile at start automatically',
      },
    }
  });

  GM_registerMenuCommand("Set preferred profile", () => {
    setTimeout(() => GM_config.open(), 1);
  });

  if (napAutoLoad) {
    if (napProfileName) {
      console.debug('[Netflix auto-picker] picking profile for ' + napProfileName);
      for (let profile of document.getElementsByClassName('profile-name')) {
        if (profile.textContent === napProfileName) {
          profile.click();
          break;
        }
      }
    } else {
      console.warn('[Netflix auto-picker] configuration is missing');
      GM_config.open();
    }
  }
}

if (document.readyState !== 'loading') {
  napMain();
} else {
  document.addEventListener('DOMContentLoaded', napMain);
}