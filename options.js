// Saves options to chrome.storage
function saveOptions() {
    var url = document.getElementById('jira-url').value;
    var comment = document.getElementById('log-comment').value;
    var merge = document.getElementById('merge-entries').checked;
    var jumpToToday = document.getElementById('jump-to-today').checked;
    chrome.storage.sync.set({
        url: url,
        comment: comment,
        merge: merge,
        jumpToToday: jumpToToday
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.style = 'display: block';
        status.textContent = 'Settings updated!';
        setTimeout(function() {
            status.style = 'display: none';
        }, 1000);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
    // Use default values
    chrome.storage.sync.get({
        url: 'https://objectedge.atlassian.net',
        comment: '',
        merge: false,
        jumpToToday: false
    }, function(items) {
        document.getElementById('jira-url').value = items.url;
        document.getElementById('log-comment').value = items.comment;
        document.getElementById('merge-entries').checked = items.merge;
        document.getElementById('jump-to-today').checked = items.jumpToToday;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
