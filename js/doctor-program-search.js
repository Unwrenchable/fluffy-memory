/*
Doctor/Program Search with API and Manual Fallback
- Tries real provider API (NPI Registry)
- If API fails or not found, allows manual entry
- Results can be saved to user's profile
*/

class DoctorProgramSearch {
  constructor(rootId = 'doctor-program-search') {
    this.rootId = rootId;
    this.results = [];
    this.render();
  }

  render() {
    const root = document.getElementById(this.rootId);
    if (!root) return;
    root.innerHTML = `
      <div class="doctor-program-search-container">
        <h2>👨‍⚕️ Doctor & Program Search</h2>
        <form id="search-form">
          <input type="text" id="search-specialty" placeholder="Specialty or program (e.g. Neurologist, Medicaid)">
          <input type="text" id="search-location" placeholder="ZIP code or city">
          <button type="submit">Search</button>
        </form>
        <div id="search-status"></div>
        <div id="search-results">
          ${this.results.map((r, i) => `
            <div class="search-result">
              <strong>${r.name}</strong> (${r.type})<br>
              <em>${r.address || ''}</em><br>
              <button onclick="window.doctorProgramSearch.saveResult(${i})">Save</button>
            </div>
          `).join('')}
        </div>
        <div id="manual-entry" style="display:none;">
          <h3>Manual Entry</h3>
          <input type="text" id="manual-name" placeholder="Name">
          <input type="text" id="manual-type" placeholder="Type (Doctor, Program)">
          <input type="text" id="manual-address" placeholder="Address">
          <button onclick="window.doctorProgramSearch.addManualEntry()">Add</button>
        </div>
      </div>
    `;
    this.attachEvents();
  }

  attachEvents() {
    document.getElementById('search-form').onsubmit = e => {
      e.preventDefault();
      this.search();
    };
  }

  async search() {
    const specialty = document.getElementById('search-specialty').value.trim();
    const location = document.getElementById('search-location').value.trim();
    this.showStatus('Searching...');
    this.results = [];
    this.render();
    // Try NPI Registry API (public, no key needed)
    try {
      // If user enters a rare condition, map to known taxonomy or use as keyword
      let taxonomy = specialty;
      // Example: map "acromegaly" to "Endocrinology" (can expand this mapping)
      const rareMap = {
        'acromegaly': 'Endocrinology',
        'cushing': 'Endocrinology',
        'pituitary': 'Endocrinology',
        'marfan': 'Genetics',
        'ehlers-danlos': 'Genetics',
        'porphyria': 'Hematology',
        'scleroderma': 'Rheumatology',
        'als': 'Neurology',
        'myasthenia': 'Neurology',
        'huntington': 'Neurology',
        'rare': ''
      };
      for (const [key, val] of Object.entries(rareMap)) {
        if (specialty.toLowerCase().includes(key)) taxonomy = val;
      }
      const url = `https://npiregistry.cms.hhs.gov/api/?version=2.1&limit=10&city=${encodeURIComponent(location)}&taxonomy_description=${encodeURIComponent(taxonomy)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        // Highlight if result matches rare/complex search
        this.results = data.results.map(r => {
          const docName = r.basic.organization_name || r.basic.name || 'Unknown';
          const docType = r.taxonomies?.[0]?.desc || 'Doctor';
          const docAddress = r.addresses?.[0]?.address_1 + ', ' + r.addresses?.[0]?.city + ', ' + r.addresses?.[0]?.state;
          let highlight = '';
          if (taxonomy !== specialty && taxonomy && docType.toLowerCase().includes(taxonomy.toLowerCase())) {
            highlight = ' <span style="color:#b83280;font-weight:bold;">(Rare/Complex Specialist)</span>';
          }
          return { name: docName, type: docType + highlight, address: docAddress };
        });
        this.showStatus('');
        this.render();
        return;
      } else {
        this.showStatus('No results found. Try manual entry.');
        document.getElementById('manual-entry').style.display = 'block';
      }
    } catch (e) {
      this.showStatus('API error. Try manual entry.');
      document.getElementById('manual-entry').style.display = 'block';
    }
  }

  addManualEntry() {
    const name = document.getElementById('manual-name').value.trim();
    const type = document.getElementById('manual-type').value.trim();
    const address = document.getElementById('manual-address').value.trim();
    if (!name || !type) {
      this.showStatus('Name and type required.');
      return;
    }
    this.results.push({ name, type, address });
    this.showStatus('Manual entry added.');
    this.render();
  }

  saveResult(idx) {
    const saved = JSON.parse(localStorage.getItem('savedProviders') || '[]');
    saved.push(this.results[idx]);
    localStorage.setItem('savedProviders', JSON.stringify(saved));
    this.showStatus('Saved!');
  }

  showStatus(msg) {
    document.getElementById('search-status').innerText = msg;
  }
}

// Usage: Place <div id="doctor-program-search"></div> in your HTML, then:
// window.doctorProgramSearch = new DoctorProgramSearch();
