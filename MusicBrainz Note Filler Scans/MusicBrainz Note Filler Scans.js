// ==UserScript==
// @name         MusicBrainz - Scan Note Button
// @namespace    https://musicbrainz.org/
// @version      1.0
// @description  Adds a button to the Add Cover Art page that fills the edit note with a standard scan description
// @author       ClaudeCode
// @match        https://musicbrainz.org/release/*/add-cover-art
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const SCAN_NOTE = `Scanned images are my own, at 600dpi with automatic colour calibration. Images are stored as a high quality JPEG and then cropped in XNView MP. I do my best to ensure the images are straight and deskewed, but depending on the material condition and composition this is difficult to avoid. Additional information about these scans can be found below:`;

    function addScanNoteButton() {
        const editNoteField = document.getElementById('id-add-cover-art.edit_note');
        if (!editNoteField) return;

        // Avoid adding the button more than once
        if (document.getElementById('mb-scan-note-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'mb-scan-note-btn';
        btn.type = 'button';
        btn.textContent = '📷 Scan Note';
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
            editNoteField.value = SCAN_NOTE;
            // Place cursor at end of text so the user can type their additional info
            editNoteField.focus();
            editNoteField.setSelectionRange(editNoteField.value.length, editNoteField.value.length);
        });

        // Insert the button just after the textarea
        editNoteField.insertAdjacentElement('afterend', btn);
    }

    // Run once the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addScanNoteButton);
    } else {
        addScanNoteButton();
    }
})();