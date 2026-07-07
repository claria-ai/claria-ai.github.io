# Build

`index.html`, `hipaa.html`, and `demos.html` are GENERATED from `templates/*.html.j2` + `claria.yml` by `build.py`. Never hand-edit them, and never grep-and-replace version strings.

Release bump (the only routine change):
1. Edit `claria.yml`: `release.version` and each artifact's `size`.
2. `uv run build.py` (or `pip install jinja2 pyyaml && python3 build.py`).
3. Commit everything, including the regenerated HTML — GitHub Pages serves the checked-in files from the repo root.

Content/markup changes go in `templates/`; parameters go in `claria.yml`; CSS/JS in `style.css` and `static/`. Re-run `build.py` after any of these.

Preview locally: `python3 -m http.server` then open http://localhost:8000/.

# Content guidance

* Screenshots and videos in `img/` and `videos/` are generated in the sibling claria repo at `screenshots/` and `demos/`. Don't hand-edit — regenerate there and copy in. See that repo's `screenshots/README.md` for the workflow.
* Don't use the word `workflow`. Clinicians don't use it, it's corpo-speak.
* This is a report/summary/analysis tool
* Emphasize this is HIPAA compliant. Aim to educate readers on their HIPAA responsibilities.
* Clarify that Amazon Web Services is a serious, complex system but Claria has step-by-step guides on how to properly configure it. It's good to be cautious but Claria helps you own the Cloud.
