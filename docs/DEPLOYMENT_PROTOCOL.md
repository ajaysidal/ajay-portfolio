# AJAY-PORTFOLIO — DEFINITIVE DEPLOYMENT PROTOCOL v1.0

This protocol is MANDATORY for EVERY task that touches the codebase. No exceptions.

## SECTION 0: IMMUTABLE ENVIRONMENT FACTS (NEVER DEVIATE OR ASSUME OTHERWISE)

| Fact | Value |
|------|-------|
| Repository | https://github.com/ajaysidal/ajay-portfolio.git |
| Branch | main |
| Hosting | Self-hosted Docker on Contabo VPS — NOT Vercel, NOT Netlify |
| VPS | 157.173.127.188 (user: silas) |
| Project path | /opt/ajay-portfolio |
| Compose service | ajay-portfolio |
| Container | ajay-portfolio-ajay-portfolio-1 |
| App port | 3000 (Next.js 16, webpack build) |
| Live domain | https://buildwithai.digital |
| Build time | 3–9 minutes is NORMAL. Never interrupt a running build. |

**CRITICAL TRUTH:** There is NO CI/CD auto-deployment. Pushing to GitHub does NOT update the live site. The site ONLY updates when the Docker image is rebuilt on the VPS. Never state or imply that a git push deploys the site.

## SECTION 1: DIVISION OF RESPONSIBILITY (NON-NEGOTIABLE)

**SILAS AGENT executes:** Backup → Code changes → TypeScript check → Local build → Git commit → Git push → Output deployment script.
**AJAY (user) executes:** ALL `docker compose` commands manually on the VPS.
**The agent must NEVER run `docker compose build/up/down` itself.** Output them as a copy-paste block for Ajay.

## PHASE 0: ROLLOVER BACKUP (MANDATORY FIRST STEP — BEFORE TOUCHING ANY FILE)

```bash
cd /opt/ajay-portfolio
mkdir -p backups
TS=$(date +%F-%H%M%S)
tar -czf "backups/ajay-portfolio-${TS}.tar.gz" --exclude=./node_modules --exclude=./.next --exclude=./backups --exclude=./.git .
ln -sfn "ajay-portfolio-${TS}.tar.gz" backups/ajay-portfolio-latest.tar.gz
# Retention: keep only the 3 most recent backups (rollover)
ls -1t backups/ajay-portfolio-2*.tar.gz | tail -n +4 | xargs -r rm -f
ls -lh backups/
echo "✅ Rollover backup created: ajay-portfolio-${TS}.tar.gz"
```

**Gate:** Do not proceed to Phase 1 until the backup file is confirmed in the `ls` output.

## PHASE 1: CODE CHANGE RULES

1. **Brand lock:** `#D4AF37` gold, `#0B0C10` dark, `#1F2833` surface, `#F8F9FA` / `#aab3bd` text. Existing fonts unchanged.
2. **Zero breaking changes:** Preserve `export const metadata`, Puck CMS schemas, auth, and `app/layout.tsx` structure unless the task explicitly targets them.
3. **TypeScript:** Zero `any` types. Internal links use `next/link`. Images use `next/image`.
4. **JSX safety:** Code snippets containing backticks or `${}` MUST be extracted into `const` string variables outside JSX. Never nest them raw in template literals.
5. **R3F rules:** Uppercase `<Canvas>` only. One canvas per page. No inline percentage styles on Canvas — use `className="absolute inset-0 w-full h-full"` and let R3F manage sizing.
6. **File writes:** If a heredoc (`cat << 'EOF'`) gets truncated by the terminal, rewrite the file using `python3` with `open(path, 'w')`. Verify with `wc -l` and `head`/`tail` after every write.
7. **Git hygiene (run once per session):**
```bash
cd /opt/ajay-portfolio
grep -qxF 'backups/' .gitignore || echo 'backups/' >> .gitignore
grep -qxF '.env.local' .gitignore || echo '.env.local' >> .gitignore
grep -qxF 'data/' .gitignore || echo 'data/' >> .gitignore
```

## PHASE 2: LOCAL VERIFICATION GATE (MANDATORY)

```bash
cd /opt/ajay-portfolio
npx tsc --noEmit
npm run build
```

**Gate:** If EITHER fails → STOP. Fix the error, re-run both. NEVER proceed to Phase 3 with a failing build. NEVER deploy a broken build.

## PHASE 3: GIT COMMIT & PUSH (MANDATORY AFTER EVERY SUCCESSFUL BUILD)

```bash
cd /opt/ajay-portfolio
git status --short          # Review: no secrets, no backups, no unintended files
git add -A
git commit -m "<type>: <concise description>"   # types: feat | fix | chore | docs | refactor
git push origin main
git log --oneline -1        # Report the commit hash to Ajay
```

**Gate:** Confirm the push succeeded (output shows `main -> main`). If push fails, report the exact error — do not silently skip.

## PHASE 4: OUTPUT THE MANUAL VPS DEPLOYMENT SCRIPT (VERBATIM — FOR AJAY TO RUN)

```bash
cd /opt/ajay-portfolio

echo "🔨 Step 1: Rebuilding application..."
docker compose build ajay-portfolio

echo "🚀 Step 2: Starting services..."
docker compose up -d

echo "⏳ Step 3: Waiting 25 seconds for Next.js to initialize..."
sleep 25

echo "🔍 Step 4: Verifying critical endpoints..."
curl -s -o /dev/null -w "Homepage:      %{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "Services:      %{http_code}\n" http://localhost:3000/services
curl -s -o /dev/null -w "Pricing:       %{http_code}\n" http://localhost:3000/pricing
curl -s -o /dev/null -w "Contact:       %{http_code}\n" http://localhost:3000/contact
curl -s -o /dev/null -w "Blog Post:     %{http_code}\n" http://localhost:3000/blog/operational-automation
curl -s -o /dev/null -w "Case Study:    %{http_code}\n" http://localhost:3000/case-studies/ai-operations-automation

echo "✅ Deployment complete. Hard refresh browser (Ctrl + Shift + R) or use Incognito."
```

> ⚠️ **Troubleshooting:** If the build fails, run `docker compose logs --tail=50 ajay-portfolio` and paste the output back to me for an immediate, precise fix.

## PHASE 5: EXPECTED RESULTS REFERENCE

| Endpoint | Expected | Notes |
|----------|----------|-------|
| All pages above | 200 | Any 404/500 = regression, investigate immediately |
| /api/newsletter (GET) | 405 | CORRECT — POST-only route. Not an error. |
| Browser check | Incognito + Ctrl+Shift+R | Browser cache masks new deployments |

## PHASE 6: TROUBLESHOOTING MATRIX

| Symptom | Command | Action |
|---------|---------|--------|
| Build fails | `docker compose logs --tail=50 ajay-portfolio` | Paste last 15 lines to Silas (chat) for diagnosis |
| Code changed but site unchanged | `docker compose build --no-cache ajay-portfolio && docker compose up -d` | Docker cache staleness |
| Suspected deeper cache issue | `docker builder prune -f` then rebuild | Full cache purge |
| Runtime crash (white screen) | F12 → Console → screenshot errors | Report to Silas; check R3F rules in Phase 1 |
| Container won't start | `docker compose ps` + `docker compose logs --tail=50 ajay-portfolio` | Report output |
| File write looks truncated | `wc -l <file>` + `head -20 <file>` + `tail -10 <file>` | Rewrite via python3 |

## PHASE 7: ROLLBACK PROCEDURES (IF A DEPLOYMENT BREAKS PRODUCTION)

**Option A — Git revert (preferred, preserves history):**
```bash
cd /opt/ajay-portfolio
git revert HEAD --no-edit
git push origin main
docker compose build ajay-portfolio && docker compose up -d
```

**Option B — Full backup restore (emergency):**
```bash
cd /opt/ajay-portfolio
tar -xzf backups/ajay-portfolio-latest.tar.gz -C /opt/ajay-portfolio
docker compose build ajay-portfolio && docker compose up -d
```
(Option A/B docker commands are executed by Ajay, not the agent.)

## PHASE 8: COMPLETION REPORT TEMPLATE (OUTPUT AFTER EVERY TASK)

| Check | Status |
|-------|--------|
| Phase 0: Rollover backup | ✅ filename |
| Phase 2: `npx tsc --noEmit` | ✅/❌ |
| Phase 2: `npm run build` | ✅/❌ (pages generated) |
| Phase 3: Git commit | ✅ hash |
| Phase 3: Git push | ✅ main -> main |
| Phase 4: VPS script output | ✅ provided to Ajay |
