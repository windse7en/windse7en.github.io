Deploy the FixerUp homepage to fixerupus.com.

Steps:
1. Navigate to the homepage source: `playground/fixerup_homepage/`
2. Ensure `index.html` has the dev version (with `<script type="module" src="/src/main.tsx"></script>`, NOT built asset references)
3. Run `npm install` if needed
4. Build for the **playground path** (used by windse7en.github.io/playground/fixerup_homepage/):
   ```
   npx vite build
   ```
   This outputs to `out/` with base `/playground/fixerup_homepage/`
5. Copy playground build output to the deployed location:
   ```
   rm -f assets/index-*.js assets/index-*.js.map assets/index-*.css
   cp out/assets/* assets/
   cp out/index.html index.html
   ```
6. Build for the **root domain** (fixerupus.com):
   ```
   BASE_PATH="/" npx vite build --base "/" --outDir out_root --assetsDir assets_fixerup
   ```
7. Copy root build output to repo root:
   ```
   rm -rf ../../assets_fixerup
   cp -r out_root/assets_fixerup ../../
   cp out_root/index.html ../../index.html
   ```
8. Clean up temp build dirs:
   ```
   rm -rf out_root
   ```
9. From the repo root, stage, commit, and push:
   ```
   cd ../..
   git add index.html assets_fixerup/ playground/fixerup_homepage/index.html playground/fixerup_homepage/assets/ playground/fixerup_homepage/out/
   git commit -m "deploy: update FixerUp homepage"
   git push origin master
   ```

Important notes:
- The repo is at `/Users/taozh/workspaces/wilson_1/windse7en.github.io/`
- GitHub Pages auto-deploys from master — push triggers deployment
- Two builds are needed: one for `/playground/fixerup_homepage/` path, one for root `/` (fixerupus.com)
- Root build uses `assets_fixerup/` as the asset directory to avoid conflicts with other repo assets
- Do NOT commit `node_modules/`, `out_root/`, or `*.bak` files
