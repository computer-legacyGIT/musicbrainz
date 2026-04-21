// ==UserScript==
// @name         MusicBrainz Auto-Submit Harmony Recordings
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Auto-submits recording edit forms when edit note contains "Matched recording while importing" which is seeded from the Harmony import tool
// @author       ClaudeCode
// @match        https://musicbrainz.org/recording/*/edit*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const TRIGGER_TEXT = 'Matched recording while importing';
    const POLL_INTERVAL = 500;  // ms between checks for the field
    const MAX_WAIT = 10000;     // give up after 10s
    const SUBMIT_DELAY = 2500;  // ms to wait after field found before submitting

    let elapsed = 0;

    const interval = setInterval(() => {
        elapsed += POLL_INTERVAL;

        const editNoteField = document.getElementById('id-edit-recording.edit_note');

        if (editNoteField) {
            clearInterval(interval);
            console.log(`[MB AutoSubmit] Field found — waiting ${SUBMIT_DELAY}ms for seeded data to load...`);

            setTimeout(() => {
                if (editNoteField.value.includes(TRIGGER_TEXT)) {
                    console.log('[MB AutoSubmit] Trigger text found — submitting form...');

                    const submitBtn = document.querySelector('button.submit[type="submit"], input[type="submit"]');
                    if (submitBtn) {
                        submitBtn.click();
                    } else {
                        const form = editNoteField.closest('form');
                        if (form) {
                            form.submit();
                        } else {
                            console.warn('[MB AutoSubmit] Could not find a submit button or form to submit.');
                        }
                    }
                } else {
                    console.log('[MB AutoSubmit] Edit note does not contain trigger text — doing nothing.');
                }
            }, SUBMIT_DELAY);

        } else if (elapsed >= MAX_WAIT) {
            clearInterval(interval);
            console.warn('[MB AutoSubmit] Timed out waiting for edit note field.');
        }
    }, POLL_INTERVAL);
})();