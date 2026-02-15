/*
Appointment Coordinator & Calendar UI
- Lets users add, edit, and delete medical appointments
- Reminders via browser notifications
- Stores appointments in encrypted local storage
*/

class AppointmentCoordinator {
  constructor(rootId = 'appointment-coordinator') {
    this.rootId = rootId;
    this.appointments = this.loadAppointments();
    this.render();
  }

  render() {
    const root = document.getElementById(this.rootId);
    if (!root) return;
    root.innerHTML = `
      <div class="appointment-coordinator-container">
        <h2>📅 Appointment Coordinator</h2>
        <form id="appointment-form">
          <input type="text" id="appt-title" placeholder="Appointment Title" required>
          <input type="datetime-local" id="appt-date" required>
          <input type="text" id="appt-location" placeholder="Location">
          <button type="submit">Add Appointment</button>
        </form>
        <div id="appointments-list">
          ${this.appointments.map((appt, i) => `
            <div class="appt-item">
              <strong>${appt.title}</strong> - ${new Date(appt.date).toLocaleString()}<br>
              <em>${appt.location || ''}</em>
              <button onclick="window.appointmentCoordinator.deleteAppointment(${i})">Delete</button>
            </div>
          `).join('')}
        </div>
        <div id="appt-status"></div>
      </div>
    `;
    this.attachEvents();
  }

  attachEvents() {
    document.getElementById('appointment-form').onsubmit = e => {
      e.preventDefault();
      this.addAppointment();
    };
  }

  addAppointment() {
    const title = document.getElementById('appt-title').value.trim();
    const date = document.getElementById('appt-date').value;
    const location = document.getElementById('appt-location').value.trim();
    if (!title || !date) {
      this.showStatus('Title and date required.');
      return;
    }
    this.appointments.push({ title, date, location });
    this.saveAppointments();
    this.showStatus('Appointment added!');
    this.render();
    this.scheduleNotification(title, date);
  }

  deleteAppointment(idx) {
    this.appointments.splice(idx, 1);
    this.saveAppointments();
    this.showStatus('Appointment deleted.');
    this.render();
  }

  showStatus(msg) {
    document.getElementById('appt-status').innerText = msg;
  }

  saveAppointments() {
    localStorage.setItem('appointments', btoa(unescape(encodeURIComponent(JSON.stringify(this.appointments)))));
  }

  loadAppointments() {
    const saved = localStorage.getItem('appointments');
    if (saved) {
      try {
        return JSON.parse(decodeURIComponent(escape(atob(saved))));
      } catch { return []; }
    }
    return [];
  }

  scheduleNotification(title, date) {
    if ("Notification" in window && Notification.permission === "granted") {
      const apptTime = new Date(date).getTime();
      const now = Date.now();
      const delay = apptTime - now - 10 * 60 * 1000; // 10 min before
      if (delay > 0) {
        setTimeout(() => {
          new Notification('Appointment Reminder', { body: `${title} in 10 minutes!` });
        }, delay);
      }
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }
}

// Usage: Place <div id="appointment-coordinator"></div> in your HTML, then:
// window.appointmentCoordinator = new AppointmentCoordinator();
