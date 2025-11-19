# 🚀 Automated GitHub Repository Sync Setup

Your website now automatically updates when you add new GitHub repositories! Here's how it works and how to set it up.

## 🔐 Security Setup (IMPORTANT!)

### Step 1: Revoke Your Current Token

**⚠️ URGENT**: The token you shared earlier was exposed publicly. You must revoke it immediately:

1. Go to: https://github.com/settings/tokens
2. Find the token in your list
3. Click "Delete" or "Revoke"

### Step 2: Create a New Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Portfolio Auto-Sync`
4. Set expiration: `No expiration` (or your preferred duration)
5. Select **only** these scopes:
   - ✅ `public_repo` (Access public repositories)
   - ✅ `read:user` (Read user profile data)
6. Click **"Generate token"**
7. **Copy the token** (it starts with `ghp_`)

### Step 3: Add Token to GitHub Secrets

1. Go to your repository settings:
   ```
   https://github.com/ragilmalik/ragilmalik.github.io/settings/secrets/actions
   ```

2. Click **"New repository secret"**

3. Enter:
   - **Name**: `GH_PERSONAL_TOKEN`
   - **Value**: Paste your new token

4. Click **"Add secret"**

✅ **Done!** Your token is now stored securely.

---

## 🔄 How It Works

### Automatic Updates

The system uses **GitHub Actions** to automatically sync your repositories:

```
┌─────────────────┐
│  GitHub Actions │
│   (scheduled)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Fetch repos    │
│  using token    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Update         │
│  repos.json     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Website reads  │
│  repos.json     │
└─────────────────┘
```

### When Updates Happen

Your website data updates automatically in these scenarios:

1. **Daily**: Every day at 00:00 UTC
2. **On Push**: When you push to the `main` branch
3. **Manual**: You can trigger it manually anytime

### What Gets Updated Automatically

✅ **Repository Cards**: All new repos appear automatically
✅ **Stats**: Total repos, followers, years active
✅ **Charts**: Language distribution pie chart
✅ **Timeline**: Cumulative repository growth over time
✅ **Skills**: Extracted from repository topics/tags
✅ **Languages**: Detected from repository languages

---

## 🎯 Manual Trigger

To manually trigger an update:

1. Go to: https://github.com/ragilmalik/ragilmalik.github.io/actions/workflows/sync-repos.yml
2. Click **"Run workflow"**
3. Select branch: `main`
4. Click **"Run workflow"**

The update will complete in about 30 seconds, and your website will refresh automatically!

---

## 📊 What Happens When You Add a New Repo

Let's say you create a new repository called `my-awesome-project`:

1. You create the repo on GitHub
2. Within 24 hours (or on next push), GitHub Actions runs
3. The workflow:
   - Fetches all your public repositories
   - Calculates language statistics
   - Updates the timeline
   - Extracts skills from topics
   - Saves everything to `repos.json`
4. Your website automatically displays:
   - ✅ New repository card with description, stars, forks
   - ✅ Updated stats (total repos count)
   - ✅ Updated language chart
   - ✅ Updated timeline graph
   - ✅ New skills/topics from the repo

**No manual work required!**

---

## 🛠️ Customization

### Adjusting Update Frequency

Edit `.github/workflows/sync-repos.yml`:

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight UTC
```

Common schedules:
- Every 6 hours: `0 */6 * * *`
- Every hour: `0 * * * *`
- Twice daily: `0 0,12 * * *`

### Filtering Repositories

To exclude certain repos from displaying, edit the workflow to filter them:

```yaml
# Add filter in the workflow after fetching repos
echo "$REPOS" | jq '[.[] | select(.name != "excluded-repo-name")]'
```

---

## 🐛 Troubleshooting

### Website Not Updating?

1. **Check if the workflow ran**:
   - Go to: https://github.com/ragilmalik/ragilmalik.github.io/actions
   - Look for "Sync GitHub Repositories"
   - Check if it completed successfully (green checkmark)

2. **Check the token**:
   - Make sure `GH_PERSONAL_TOKEN` is set in secrets
   - Make sure the token has `public_repo` and `read:user` permissions

3. **Force refresh**:
   - Clear browser cache
   - Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Workflow Failing?

Check the error logs:
1. Go to Actions tab
2. Click on the failed workflow
3. Click on the "sync" job
4. Read the error message

Common issues:
- **403 Forbidden**: Token is invalid or expired
- **404 Not Found**: Token doesn't have correct permissions
- **Rate Limited**: Wait 1 hour for GitHub API limits to reset

---

## 📁 Files Overview

| File | Purpose |
|------|---------|
| `.github/workflows/sync-repos.yml` | GitHub Actions workflow that fetches repo data |
| `repos.json` | Auto-generated data file (updated by workflow) |
| `app.js` | Website JavaScript (reads from repos.json) |
| `SETUP.md` | This file - setup instructions |

---

## ✨ Features

Your portfolio now has:

- ✅ **Zero-maintenance updates**: Add repos on GitHub, website updates automatically
- ✅ **Real-time stats**: Always shows accurate repo counts, followers, activity
- ✅ **Dynamic charts**: Language distribution updates as you code
- ✅ **Timeline tracking**: See your coding journey visualized
- ✅ **Skill extraction**: Topics from repos become portfolio skills
- ✅ **Perfect alignment**: New repo cards automatically match existing design
- ✅ **No manual edits**: Never touch HTML/JS to add projects again

---

## 🎉 That's It!

You're all set! From now on:

1. **Create new repos** → They appear on your website automatically
2. **Update descriptions** → Changes reflect within 24 hours
3. **Add topics/tags** → Skills section updates automatically
4. **Get stars/forks** → Stats update automatically

Enjoy your self-updating portfolio! 🚀
