/*
 thankyou.js
 Populate a .submitted div with the saved adoption form from localStorage.
*/

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.submitted');
    if (!container) return;

    // Helper: decide whether an object looks like a form submission
    function isProbablyForm(obj) {
        if (!obj || typeof obj !== 'object') return false;
        const likelyKeys = ['name','firstName','lastName','email','phone','pet','animal','address','comments','message','breed'];
        let hits = 0;
        for (const k of likelyKeys) if (k in obj) hits++;
        return hits >= 1; // 1 or more matching keys is enough
    }

    function prettifyKey(k) {
        if (!k) return '';
        return String(k)
            .replace(/([A-Z])/g, ' $1')
            .replace(/[_-]/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .trim();
    }

    // Collect candidate keys (common names + any key that looks related)
    const candidates = new Set([
        'adoptionForm','adoptionRequest','adoptionSubmission','submittedForm','formData','application'
    ]);
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (/adopt|adoption|submission|form|application|request/i.test(key)) candidates.add(key);
    }

    // Try to find a usable value
    let found = null;
    let foundKey = null;

    // Try candidate keys first
    for (const key of candidates) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        try {
            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                found = parsed;
                foundKey = key;
                break;
            }
        } catch (e) {
            // Not JSON - treat as single string value
            if (raw.trim()) {
                found = { value: raw };
                foundKey = key;
                break;
            }
        }
    }

    // If nothing yet, scan all keys and pick the first JSON object that looks like a form
    if (!found) {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const raw = localStorage.getItem(key);
            if (!raw) continue;
            try {
                const parsed = JSON.parse(raw);
                if (parsed && typeof parsed === 'object' && isProbablyForm(parsed)) {
                    found = parsed;
                    foundKey = key;
                    break;
                }
            } catch (e) {
                // ignore non-json
            }
        }
    }

    // Render result into .submitted
    container.innerHTML = ''; // clear any placeholder content

    if (!found) {
        const p = document.createElement('p');
        p.textContent = 'No submitted adoption form data was found in localStorage.';
        container.appendChild(p);
        return;
    }

    const h2 = document.createElement('h2');
    h2.textContent = 'Copy of your submission';
    container.appendChild(h2);



    const wrapper = document.createElement('div');
    wrapper.className = 'submitted-copy';

    function appendField(key, value) {
        const row = document.createElement('div');
        row.className = 'submitted-row';

        const label = document.createElement('strong');
        // handle common variants for first/last name, otherwise use prettifyKey
        if (key === 'fname') {
            label.textContent = 'First Name: ';
        } else if (key === 'lname') {
            label.textContent = 'Last Name: ';
        } else {
            label.textContent = prettifyKey(key) + ': ';
        }
        row.appendChild(label);

        const val = document.createElement('span');
        if (Array.isArray(value)) {
            val.textContent = value.join(', ');
        } else if (value === null || value === undefined) {
            val.textContent = '';
        } else if (typeof value === 'object') {
            try {
                // pretty print small nested objects
                val.textContent = JSON.stringify(value, null, 2);
            } catch {
                val.textContent = String(value);
            }
        } else {
            val.textContent = String(value);
        }
        row.appendChild(val);
        wrapper.appendChild(row);
    }

    if (typeof found === 'object' && !Array.isArray(found)) {
        // Preserve insertion order from the stored object
        for (const k of Object.keys(found)) appendField(k, found[k]);
    } else {
        appendField('value', found);
    }

    container.appendChild(wrapper);
});