## Deploying `play-nine` with GitHub Pages

Follow these steps to host the built app on GitHub Pages.

1. **Push the source to GitHub**
   - Create a repository on GitHub, e.g. `play-nine`.
   - From the project root, add the remote and push:
     ```
     git remote add origin git@github.com:<username>/play-nine.git
     git add .
     git commit -m "Prepare for GitHub Pages deploy"
     git push origin main
     ```

2. **Set the public URL**
   - Edit `package.json` and add the `homepage` field at the top level:
     ```json
     "homepage": "https://<username>.github.io/play-nine/"
     ```
     Replace `<username>` (and the repo name if different).

3. **Install the deployment helper**
   - Install the `gh-pages` package:
     ```
     npm install --save-dev gh-pages
     ```

4. **Add deployment scripts**
   - Update the `scripts` section in `package.json`:
     ```json
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
     ```
   - Commit the changes:
     ```
     git add package.json package-lock.json
     git commit -m "Add GitHub Pages deployment scripts"
     git push origin main
     ```

5. **Build and publish**
   - Run:
     ```
     npm run deploy
     ```
     This builds the app and publishes the `build/` folder to a new `gh-pages` branch.

6. **Enable GitHub Pages**
   - In GitHub → repository **Settings** → **Pages**, select the `gh-pages` branch and save.
   - After a minute or two, the site is available at the URL defined in the `homepage` field.

## Deploying multiple apps

- **Per-repo pages (recommended):** Place each app in its own repo. GitHub Pages serves from `https://<username>.github.io/<repo>/`. Repeat the above steps for each repository.
- **Single user/organization site:** A special repo named `<username>.github.io` serves `https://<username>.github.io/`. Reserve it for content meant for the root domain.
- **Custom subfolders:** Alternatively, publish different builds into subdirectories (e.g. `docs/app-one`, `docs/app-two`) within a single repo, adjusting each app’s `homepage` path.
- You can map different domains to different repos or branches via custom DNS (`CNAME` files) if you need unique URLs for each app.

Once configured, redeploy by running `npm run deploy` whenever you push new changes.

