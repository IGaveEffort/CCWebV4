# Google Sheets Setup Guide — Campus Cliques Forms

Follow these steps once to connect your forms to Google Sheets. Takes about 5 minutes.

---

## Step 1 — Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like **Campus Cliques Form Submissions**.
3. You don't need to add any columns — the script creates them automatically.

---

## Step 2 — Open Apps Script

1. In your Google Sheet, click **Extensions → Apps Script** in the top menu.
2. A new tab opens with a code editor. Delete all the default code in there.

---

## Step 3 — Paste the Script

1. Open the file **`apps-script.gs`** (included in your zip).
2. Copy the entire contents and paste it into the Apps Script editor.
3. Click the **💾 Save** icon (or Ctrl/Cmd + S).

---

## Step 4 — Deploy as a Web App

1. Click the **Deploy** button (top right) → **New deployment**.
2. Click the gear icon ⚙ next to "Type" and select **Web app**.
3. Fill in the settings:
   - **Description**: Campus Cliques Forms (or anything you like)
   - **Execute as**: Me
   - **Who has access**: **Anyone** ← this is required for the forms to work
4. Click **Deploy**.
5. Google will ask you to authorize — click **Authorize access**, choose your Google account, and approve.
6. After deploying, you'll see a **Web app URL** — copy it. It looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

---

## Step 5 — Add the URL to Your Website

1. Open **`index.html`** in a text editor.
2. Find this line near the top of the `<script>` block:
   ```js
   const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `YOUR_APPS_SCRIPT_URL_HERE` with the URL you copied in Step 4.
4. Save the file.

---

## Step 6 — Test It

1. Open `index.html` in your browser.
2. Fill out and submit either form.
3. Go back to your Google Sheet — you should see two tabs appear: **Ambassadors** and **Brands**, with your test submission in the right one.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Form shows "Something went wrong" | Make sure "Who has access" is set to **Anyone** in Step 4 |
| Sheet tabs don't appear | Re-check you pasted the full script and saved before deploying |
| Changes to the script don't work | You must create a **new deployment** after any edits — old URLs don't auto-update |
| Authorization error | Re-deploy and go through the authorization flow again |

---

## Re-deploying After Changes

If you edit the Apps Script code later, you **must** create a new deployment (not update the existing one) to get a fresh URL, or use "Manage deployments → Edit → New version" to push updates to the same URL.

---

That's it! Your forms now save directly to Google Sheets in real time.
