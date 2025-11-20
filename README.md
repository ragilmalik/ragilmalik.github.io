# 🚀 Advanced Developer Portfolio with Auto-Sync GitHub Data

[![Anurag's GitHub stats](https://ragilmalik-readme-stats.vercel.app/api?username=ragilmalik&show_icons=true&theme=transparent&include_all_commits=true&)](https://github.com/ragilmalik/readme-stats)

[![Readme Card](https://ragilmalik-readme-stats.vercel.app/api/pin/?username=ragilmalik&repo=readme-stats)](https://github.com/ragilmalik/readme-stats)
[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=ragilmalik&repo=github-readme-stats)](https://github.com/ragilmalik/readme-stats)

[![Top Langs](https://ragilmalik-readme-stats.vercel.app/api/top-langs/?username=ragilmalik&layout=pie)](https://github.com/ragilmalik/readme-stats)
 

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/🌟_Next--Gen_Portfolio-Auto--Sync_Edition-000000?style=for-the-badge&logo=github&logoColor=white)

**A cutting-edge portfolio that automatically syncs with your GitHub—featuring Three.js 3D animations, real-time analytics, and zero manual updates**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Portfolio-00FFFF?style=for-the-badge)](https://ragilmalik.github.io)
[![Auto-Sync](https://img.shields.io/badge/🔄_Auto--Sync-GitHub_Actions-FF0080?style=for-the-badge)](https://github.com/features/actions)
[![Three.js](https://img.shields.io/badge/🎮_Three.js-3D_Graphics-00FF41?style=for-the-badge)](https://threejs.org/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)

</div>

---

## 🎯 **Why This Portfolio is Different**

This isn't just a static website—it's a **self-updating, data-driven portfolio** that showcases your work automatically:

### **🔥 Revolutionary Features**

🔄 **100% Auto-Sync** - GitHub Actions automatically updates your portfolio every 6 hours
📊 **Real Analytics** - 6 advanced analytics cards with live GitHub data
🎨 **Zero Maintenance** - Push code, portfolio updates itself—no manual editing
🎮 **Stunning 3D** - Three.js particle animations at 60fps
📱 **Fully Responsive** - Perfect on any device, optimized for performance
⚡ **Lightning Fast** - Optimized loading, smooth animations, instant updates

### **🆕 What's New in This Version**

✅ **GitHub Actions Auto-Sync** - Automatically fetches and updates your repos
✅ **Advanced Analytics Dashboard** - 6 data-driven cards with real metrics
✅ **Real Activity Heatmap** - Shows your actual coding activity (last 30 days)
✅ **Smart Language Detection** - Auto-generates skills from your repos
✅ **Dynamic Timeline** - Development journey based on real repo dates
✅ **Technology Badges** - All languages displayed as colorful badges

---

## 📸 **Live Features Preview**

<div align="center">

### **🏠 Hero Section**
*Animated typing effect + Three.js 3D particle background + Real stats*

### **📊 Advanced Analytics Dashboard (6 Cards)**

| Card | What It Shows | Updates |
|------|---------------|---------|
| **GitHub Overview** | Total repos, followers, years active | ✅ Auto |
| **Language Distribution** | Pie chart of your coding languages | ✅ Auto |
| **Creation Timeline** | Repository growth over time | ✅ Auto |
| **Recent Activity** | Last 30 days heatmap + stats | ✅ Auto |
| **Total Stars** | Stars earned across all repos | ✅ Auto |
| **Technologies** | All languages as colorful badges | ✅ Auto |

### **💼 Projects Section**
*All your GitHub repos displayed as interactive cards with real data*

### **🎯 Skills Visualization**
*Auto-generated from your repo languages with animated progress bars*

### **📅 Development Timeline**
*Your coding journey from first repo to latest project*

</div>

---

## 🚀 **Quick Start - Get Your Portfolio Live in 10 Minutes**

### **📋 Prerequisites**
- A GitHub account
- At least one public repository
- 10 minutes of your time

### **🎬 Step 1: Fork & Rename**

1. **Fork this repository**
   - Click the "Fork" button at the top of this page

2. **Rename your fork**
   - Go to Settings → Repository name
   - Change to: `{your-username}.github.io`
   - Click "Rename"

### **⚙️ Step 2: Configure GitHub Actions**

1. **Enable GitHub Actions**
   - Go to Actions tab in your forked repo
   - Click "I understand my workflows, go ahead and enable them"

2. **Set up workflow permissions**
   - Settings → Actions → General
   - Under "Workflow permissions", select:
     - ✅ "Read and write permissions"
   - Click "Save"

3. **Manually run the workflow (first time only)**
   - Go to Actions tab
   - Click "Sync GitHub Repos"
   - Click "Run workflow" → "Run workflow"
   - Wait ~30 seconds for it to complete

### **🌐 Step 3: Enable GitHub Pages**

1. **Activate GitHub Pages**
   - Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` | Folder: `/ (root)`
   - Click "Save"

2. **Wait 2-3 minutes**, then visit:
   ```
   https://{your-username}.github.io
   ```

### **✨ Step 4: Customize Your Portfolio**

**Edit `index.html`** (only 3 things to change):

```html
<!-- Line 6: Update page title -->
<title>Your Name - Your Title | Advanced Portfolio</title>

<!-- Line 7-8: Update meta description -->
<meta name="description" content="Your custom description here">

<!-- Line 127-130: Update bio text -->
<p class="hero-description">
    Your custom bio here. Describe who you are and what you do.
</p>
```

**Edit `app.js`** (only 1 thing to change):

```javascript
// Line 13-19: Update typing animation texts
this.typingTexts = [
    'Your Title 1',
    'Your Title 2',
    'Your Title 3',
    'Your Title 4',
    'Your Title 5'
];
```

**Edit `index.html` contact section** (line 420):

```html
<!-- Update your email -->
<p>your-email@example.com</p>
```

**That's it!** Everything else updates automatically from your GitHub repos! 🎉

---

## 🔄 **How Auto-Sync Works**

```mermaid
graph LR
    A[GitHub Actions] -->|Every 6 hours| B[Fetch Your Repos]
    B --> C[Generate repos.json]
    C --> D[Calculate Stats]
    D --> E[Update Portfolio]
    E -->|Automatically| F[Live Website]
```

### **What Gets Auto-Updated**

| Data | Source | Update Frequency |
|------|--------|------------------|
| Repository count | GitHub API | Every 6 hours |
| Stars, forks, watchers | GitHub API | Every 6 hours |
| Languages & percentages | Repo analysis | Every 6 hours |
| Activity heatmap | Repo update dates | Every 6 hours |
| Skills section | Language stats | Every 6 hours |
| Project cards | Repo metadata | Every 6 hours |
| Timeline chart | Repo creation dates | Every 6 hours |

### **Manual Update (Optional)**

Want to update immediately? Run the workflow manually:

1. Go to **Actions** tab
2. Click **"Sync GitHub Repos"**
3. Click **"Run workflow"** → **"Run workflow"**
4. Wait 30 seconds, refresh your portfolio

---

## 🎨 **Advanced Customization**

### **🌈 Change Color Scheme**

Edit `style.css` (lines 23-31):

```css
:root {
    /* Change these colors to match your brand */
    --accent-cyan: #00FFFF;      /* Primary accent */
    --accent-purple: #9D4EDD;    /* Secondary accent */
    --accent-green: #00FF41;     /* Success/Active */

    /* Or use your own colors */
    --accent-cyan: #YOUR_COLOR;
    --accent-purple: #YOUR_COLOR;
    --accent-green: #YOUR_COLOR;
}
```

### **🎮 Adjust 3D Performance**

Edit `app.js` particle count for better performance on older devices:

```javascript
// Find this in setupThreeJS() method
const particleCount = window.innerWidth > 768 ? 1000 : 500;

// Reduce for older devices:
const particleCount = window.innerWidth > 768 ? 500 : 250;
```

### **⏱️ Change Auto-Sync Frequency**

Edit `.github/workflows/sync-repos.yml`:

```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours

# Change to:
  - cron: '0 */12 * * *' # Every 12 hours
  - cron: '0 0 * * *'    # Once daily at midnight
  - cron: '0 9 * * 1'    # Every Monday at 9am
```

### **🔧 Customize Analytics Cards**

All analytics cards are in `index.html` starting at line 176. Feel free to:
- Rearrange card order
- Add custom cards
- Modify card content
- Change card styling

---

## 📊 **What Each Section Does**

### **Hero Section** (`index.html` lines 113-173)
- **Auto-updates**: Repository count, years active, Python %
- **Customize**: Bio text, typing animation texts
- **Data source**: `repos.json` stats

### **Advanced Analytics** (`index.html` lines 175-281)
- **6 Cards**: All auto-update from `repos.json`
- **Customize**: Card titles, add/remove cards
- **Data source**: GitHub Actions workflow

### **Projects** (`index.html` lines 283-311)
- **Auto-updates**: All repository cards
- **Customize**: Filter buttons, search functionality
- **Data source**: `repos.json` repositories array

### **Skills** (`index.html` lines 313-406)
- **Auto-updates**: Programming languages from repos
- **Customize**: Add frameworks/tools manually
- **Data source**: `repos.json` languageStats

### **Timeline** (`app.js` lines 1224-1254)
- **Auto-updates**: No (manually curated for better storytelling)
- **Customize**: Edit timeline milestones in `app.js`
- **Why manual**: Tells your story better than raw dates

---

## 🛠️ **Tech Stack Breakdown**

<div align="center">

| Technology | Purpose | Why It's Awesome |
|------------|---------|------------------|
| **Three.js** | 3D particle background | Stunning visual impact, 60fps |
| **Chart.js** | Analytics charts | Beautiful data visualization |
| **GSAP** | Scroll animations | Smooth, professional animations |
| **GitHub Actions** | Auto-sync repos | Zero maintenance updates |
| **Vanilla JS** | Core functionality | No bloated frameworks, pure speed |
| **CSS Grid/Flexbox** | Responsive layout | Perfect on all devices |
| **GitHub API** | Data source | Real, up-to-date information |

</div>

---

## 🎯 **Perfect For**

✅ **Frontend Developers** - Showcase your design and animation skills
✅ **Backend Developers** - Impress with auto-sync and API integration
✅ **Full-Stack Developers** - Complete package with both visual appeal and functionality
✅ **Students** - Stand out in internship/job applications
✅ **Freelancers** - Attract high-value clients with professional presentation
✅ **Open Source Maintainers** - Professional hub for your projects

---

## 📱 **Device Performance**

<div align="center">

| Device | FPS | 3D Effects | Load Time |
|--------|-----|------------|-----------|
| **Desktop (High-end)** | 60fps | Full quality | < 1s |
| **Laptop (Mid-range)** | 60fps | Full quality | < 1.5s |
| **Tablet (iPad)** | 45-60fps | Optimized | < 2s |
| **Mobile (Modern)** | 30-45fps | Reduced particles | < 2.5s |
| **Mobile (Older)** | 30fps | Minimal particles | < 3s |

**Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

</div>

---

## 🐛 **Troubleshooting**

<details>
<summary><strong>❓ Portfolio not showing my repos</strong></summary>

**Check these steps:**
1. Verify `repos.json` exists in your repo
2. Go to Actions → Check if workflow ran successfully
3. If workflow failed, check Actions → Workflow permissions (should be "Read and write")
4. Manually run the workflow: Actions → "Sync GitHub Repos" → "Run workflow"

</details>

<details>
<summary><strong>❓ GitHub Actions workflow not running</strong></summary>

**Solutions:**
1. Enable Actions in your fork (Actions tab → Enable)
2. Set workflow permissions: Settings → Actions → "Read and write permissions"
3. Manually trigger: Actions → "Sync GitHub Repos" → "Run workflow"

</details>

<details>
<summary><strong>❓ Stats showing 0 or incorrect data</strong></summary>

**Fixes:**
1. Wait for GitHub Actions to run (happens every 6 hours)
2. Check `repos.json` file exists
3. Manually run workflow to update immediately
4. Clear browser cache and hard refresh (Ctrl+Shift+R)

</details>

<details>
<summary><strong>❓ Three.js animations laggy</strong></summary>

**Performance fixes:**
1. Reduce particle count in `app.js` (line ~300)
2. Check browser supports WebGL (most modern browsers do)
3. Close other browser tabs
4. Update graphics drivers

</details>

<details>
<summary><strong>❓ Want to use custom domain</strong></summary>

**Steps:**
1. Buy domain from registrar (Namecheap, Google Domains, etc.)
2. Add `CNAME` file to repo root with your domain
3. In Settings → Pages → Custom domain → Enter your domain
4. Configure DNS at your registrar (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))

</details>

---

## 🎓 **Learning Resources**

This portfolio is an excellent learning tool for:

- **GitHub Actions** - CI/CD automation, scheduled workflows
- **Three.js** - WebGL, particle systems, 3D graphics
- **Chart.js** - Data visualization, responsive charts
- **REST APIs** - GitHub API integration, data fetching
- **Modern CSS** - Grid, Flexbox, animations, custom properties
- **Vanilla JavaScript** - ES6+, async/await, classes, modules
- **Performance** - 60fps animations, optimization techniques

---

## 🤝 **Contributing**

Found a bug? Have a feature idea? Contributions are welcome!

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 **License**

MIT License - Feel free to use this for personal or commercial projects!

**What you CAN do:**
- ✅ Use commercially
- ✅ Modify freely
- ✅ Distribute
- ✅ Use privately

**What you MUST do:**
- 📄 Include the original license

---

## 🌟 **Show Your Support**

If this portfolio helped you:

- ⭐ **Star this repo** - Helps others discover it
- 🐛 **Report issues** - Help improve it for everyone
- 💡 **Contribute** - Add features or fix bugs
- 📢 **Share** - Tell other developers about it

---

## 📞 **Need Help?**

- 📖 **Documentation**: You're reading it!
- 🐛 **Bug Reports**: [Open an issue](https://github.com/ragilmalik/ragilmalik.github.io/issues)
- 💬 **Questions**: [Start a discussion](https://github.com/ragilmalik/ragilmalik.github.io/discussions)
- 📧 **Contact**: [ragilmalik@protonmail.com](mailto:ragilmalik@protonmail.com)

---

## 🎯 **Pro Tips**

💡 **Tip 1**: Add repository topics on GitHub to enable better filtering
💡 **Tip 2**: Write good repo descriptions—they appear on your portfolio
💡 **Tip 3**: Star your best projects—sort by stars to highlight them
💡 **Tip 4**: Keep repos updated—activity heatmap shows recent work
💡 **Tip 5**: Use GitHub Actions logs to debug auto-sync issues

---

<div align="center">

## 🚀 **Ready to Launch Your Portfolio?**

**Get started in 10 minutes. No coding required for basic setup.**

[![Deploy Now](https://img.shields.io/badge/🚀_DEPLOY_NOW-Get_Started-00FF41?style=for-the-badge&logo=rocket)](https://github.com/ragilmalik/ragilmalik.github.io/fork)

---

**Built with 💙 by developers, for developers**
**Powered by Three.js • GitHub Actions • Chart.js • GSAP**

### **⭐ Star this repo if it helped you land a job or impress clients!**

![Made with Love](https://img.shields.io/badge/Made_with-❤️-red?style=for-the-badge)
![Visitors](https://img.shields.io/badge/Visitors-Welcome-blue?style=for-the-badge)

</div>

---

## 📈 **Version History**

### **v2.0.0** - Current (Auto-Sync Edition)
- ✅ GitHub Actions auto-sync every 6 hours
- ✅ 6 advanced analytics cards
- ✅ Real activity heatmap
- ✅ Auto-generated skills
- ✅ Technology badges
- ✅ Development timeline

### **v1.0.0** - Original
- Basic GitHub API integration
- Three.js animations
- Project showcase

---

<div align="center">

**📊 This README is comprehensive. Scroll up to find what you need!**

**🎯 Next Steps:**
1. Fork this repo
2. Enable GitHub Actions
3. Customize your info
4. Deploy to GitHub Pages
5. Share your portfolio with the world!

</div>
