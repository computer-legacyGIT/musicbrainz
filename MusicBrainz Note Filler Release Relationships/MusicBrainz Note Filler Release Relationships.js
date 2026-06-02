// ==UserScript==
// @name         MusicBrainz - Release Relationships Edit Note Button
// @namespace    https://musicbrainz.org/
// @version      1.0
// @description  Adds a button to the release relationships editor to allow for a preset edit note when making relationship edits
// @author       ClaudeCode
// @match        https://musicbrainz.org/release/*/edit-relationships
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const mbid = window.location.pathname.split('/')[2];
    const EDIT_NOTE = `Relationships have been added and sourced from (in this order where applicable) release packaging, linked URL relationships (e.g. Discogs), or another credible source (given below). I have added relationships to the entity (recording, work, release, release group) that makes the most sense in line with both the documentation and common sense. These edits were made in the release relationship editor for the MBID ${mbid}.`;

    function addEditNoteButton() {
        const editNoteField = document.getElementById('edit-note-text');
        if (!editNoteField) return;

        // Avoid adding the button more than once
        if (document.getElementById('mb-relationship-note-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'mb-relationship-note-btn';
        btn.type = 'button';
        btn.textContent = '👥 Relationships';
        btn.title = 'Fill in the edit note with your standard edit note value';

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

    // The relationship editor is a React app, so the edit note field
    // may not exist yet when the page loads. Use a MutationObserver
    // to wait for it to appear in the DOM.
    const observer = new MutationObserver(() => {
        const editNoteField = document.getElementById('edit-note-text');
        if (editNoteField) {
            addEditNoteButton();
            observer.disconnect();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();