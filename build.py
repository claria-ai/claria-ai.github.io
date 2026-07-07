#!/usr/bin/env python3
# /// script
# requires-python = ">=3.9"
# dependencies = ["jinja2", "pyyaml"]
# ///
"""Render templates/*.html.j2 with claria.yml into the repo root.

Run `uv run build.py`, or `pip install jinja2 pyyaml && python3 build.py`.
"""

from pathlib import Path

import jinja2
import yaml

ROOT = Path(__file__).resolve().parent

HEADER = (
    "<!-- Generated from templates/{name} — DO NOT EDIT."
    " Edit claria.yml or the template and re-run build.py. -->\n"
)


def load_params() -> dict:
    params = yaml.safe_load((ROOT / "claria.yml").read_text())
    release = params["release"]
    version = release["version"]
    for a in release["artifacts"]:
        a.setdefault("card_class", "")
        a.setdefault("beta_hint", "")
        a["filename"] = f"Claria_{version}_{a['suffix']}"
        a["url"] = f"{release['download_base']}/v{version}/{a['filename']}"
    dmgs = [a for a in release["artifacts"] if a["suffix"].endswith(".dmg")]
    release["dmg_filename"] = dmgs[0]["filename"] if dmgs else ""
    return params


def main() -> None:
    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(ROOT / "templates"),
        trim_blocks=True,
        lstrip_blocks=True,
        keep_trailing_newline=True,
        undefined=jinja2.StrictUndefined,
    )
    params = load_params()
    for tpl in sorted((ROOT / "templates").glob("*.html.j2")):
        if tpl.name.startswith("base"):
            continue
        out = ROOT / tpl.name.removesuffix(".j2")
        html = env.get_template(tpl.name).render(**params)
        out.write_text(HEADER.format(name=tpl.name) + html)
        print(f"wrote {out.name}")


if __name__ == "__main__":
    main()
