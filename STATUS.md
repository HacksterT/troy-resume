---
project: troy-resume
status: active
phase: GitHub Pages migration cleanup
next_step: "Delete Azure Static Web Apps resource and sybertresume storage account to complete platform migration."
blockers:
  - "Azure cleanup and DNS final verification require manual owner action in Azure Portal and GoDaddy"
key_people:
  - "Troy Sybert (owner)"
updated: 2026-05-26
---

## Next Steps

*(No tasks/ folder found -- items below sourced from CLAUDE.md pending actions and current session state)*

- [ ] Re-run GitHub Pages deploy workflow from Actions tab once GitHub CDN recovers -- Quillen AI presentation (`Quillen_AI_2026.pdf`) is committed and ready but blocked on `actions/upload-pages-artifact` CDN outage *(source: CONTEXT.md)*
- [ ] Delete Azure Static Web Apps resource and `sybertresume` storage account in Azure Portal *(source: CLAUDE.md)*
- [ ] Confirm GoDaddy DNS A records and `www` CNAME are pointing to GitHub Pages IPs *(source: CLAUDE.md)*
- [ ] Remove `AZURE_STATIC_WEB_APPS_API_TOKEN` secret from GitHub repo settings *(source: CLAUDE.md)*
- [ ] Clean up stale Azure migration pending actions from CLAUDE.md once Azure teardown is confirmed *(source: CLAUDE.md)*

## Notes

GitHub Pages migration from Azure Static Web Apps is functionally complete -- site is live at www.troymd.com with Cal.com booking integration. Remaining work is infrastructure cleanup (Azure teardown, DNS/HTTPS confirmation). GitHub Pages deploy pipeline broken as of 2026-05-26 due to GitHub CDN issue with `actions/upload-pages-artifact`; `workflow_dispatch` trigger added to workflow so manual re-run is possible from the Actions tab.
