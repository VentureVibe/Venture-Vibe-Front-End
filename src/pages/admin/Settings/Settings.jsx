import React, { useState } from "react";
import "./Settings.scss";

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    locationSharing: false,
    privacy: "public",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Save settings logic here
    console.log("Settings saved:", settings);
  };

  return (
    <div className="settings">
      <h1>Settings</h1>
      <form className="settings-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="theme">Theme:</label>
          <select
            name="theme"
            id="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="notifications"
              checked={settings.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="locationSharing"
              checked={settings.locationSharing}
              onChange={handleChange}
            />
            Share Location
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="privacy">Privacy:</label>
          <select
            name="privacy"
            id="privacy"
            value={settings.privacy}
            onChange={handleChange}
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button type="submit" className="save-btn">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
