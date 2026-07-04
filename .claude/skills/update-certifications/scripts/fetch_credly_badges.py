#!/usr/bin/env python3
"""Fetch and classify Credly badges for a given username.

Outputs JSON with three buckets:
  - certifications: AWS/Microsoft/Google *Certified* badges, deduplicated by
    exact badge name (earliest issued_at_date, latest/most-favorable
    expires_at_date), with an `expired` flag computed against today's date.
  - awards: recognition-program badges (Top Engineers, Community Builders,
    etc.) that belong in a resume's "awards" section rather than its
    "certifications" section.
  - other: everything else (partner/training badges, unrelated community
    badges) — not auto-applied anywhere, just surfaced so a human/agent can
    decide whether any of it is relevant.

Credly's public profile page requires JavaScript, but the same data is
available from its JSON endpoint, which is what this script calls.
"""
import argparse
import datetime
import json
import sys
import urllib.request

CERT_PREFIXES = ("AWS Certified", "Microsoft Certified", "Google Cloud Certified", "Google Certified")
AWARD_KEYWORDS = ("Top Engineer", "Community Builder", "All Certifications Engineers")


def fetch_all_badges(username: str) -> list[dict]:
    badges = []
    page = 1
    while True:
        url = f"https://www.credly.com/users/{username}/badges.json?page={page}&page_size=100"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.load(resp)
        chunk = data.get("data", [])
        badges.extend(chunk)
        total = data.get("metadata", {}).get("total_count", len(badges))
        if len(badges) >= total or not chunk:
            break
        page += 1
    return badges


def classify(badges: list[dict]) -> dict:
    today = datetime.date.today().isoformat()
    cert_groups: dict[str, dict] = {}
    awards = []
    other = []

    for b in badges:
        template = b.get("badge_template", {})
        name = template.get("name", "").strip()
        issued = b.get("issued_at_date")
        expires = b.get("expires_at_date")
        description = template.get("description", "")

        if name.startswith(CERT_PREFIXES):
            g = cert_groups.setdefault(name, {"name": name, "issued_at_date": issued, "expires_at_date": expires})
            if issued and (not g["issued_at_date"] or issued < g["issued_at_date"]):
                g["issued_at_date"] = issued
            # Prefer the latest non-null expiry (renewed badges push it out).
            if expires and (not g["expires_at_date"] or expires > g["expires_at_date"]):
                g["expires_at_date"] = expires
        elif any(k in name for k in AWARD_KEYWORDS):
            awards.append({
                "name": name,
                "issued_at_date": issued,
                "expires_at_date": expires,
                "description": description,
                "badge_url": template.get("url"),
            })
        else:
            other.append({"name": name, "issued_at_date": issued, "expires_at_date": expires})

    certifications = []
    for g in cert_groups.values():
        expired = bool(g["expires_at_date"]) and g["expires_at_date"] < today
        certifications.append({**g, "expired": expired})

    certifications.sort(key=lambda c: c["issued_at_date"] or "")
    awards.sort(key=lambda a: a["issued_at_date"] or "")
    other.sort(key=lambda o: o["issued_at_date"] or "")

    return {"as_of": today, "certifications": certifications, "awards": awards, "other": other}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--username", default="keisuke-hiraki", help="Credly profile username (from the profile URL)")
    args = parser.parse_args()

    badges = fetch_all_badges(args.username)
    result = classify(badges)
    json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
    print()


if __name__ == "__main__":
    main()
