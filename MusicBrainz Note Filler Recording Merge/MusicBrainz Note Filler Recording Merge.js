// ==UserScript==
// @name         MusicBrainz - Recording Merge Edit Note Button
// @namespace    https://musicbrainz.org/
// @version      1.0
// @description  Adds a button to the merge recordings page that fills the edit note with a pre-set value
// @author       ClaudeCode
// @match        https://musicbrainz.org/recording/merge?returnto=%2F
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const EDIT_NOTE = `I identify these recordings as being the same recording, due to sharing a similar duration and the following AcoustID's: `;

    function addEditNoteButton() {
        const editNoteField = document.getElementById('edit-note-text');
        if (!editNoteField) return;

        // Avoid adding the button more than once
        if (document.getElementById('mb-scan-note-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'mb-scan-note-btn';
        btn.type = 'button';
        btn.textContent = '🔃 Merge Note';
        btn.title = 'Fill in the edit note with your standard scan description';

        btn.style.cssText = `
            display: block;
            margin-top: 6px;
            padding: 4px 10px;
            font-size: 0.85em;
            font-family: inherit;
            background-color: #eb743b;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            vertical-align: middle;
        `;

        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#c75e2a';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '#eb743b';
        });

        btn.addEventListener('click', () => {
            editNoteField.value = EDIT_NOTE;
            // Place cursor at end of text so the user can type their additional info
            editNoteField.focus();
            editNoteField.setSelectionRange(editNoteField.value.length, editNoteField.value.length);
        });

        // Insert the button just after the textarea
        editNoteField.insertAdjacentElement('afterend', btn);
    }

    // Run once the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addEditNoteButton);
    } else {
        addEditNoteButton();
    }
})();