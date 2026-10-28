# Security Policy

## Reporting vulnerabilities

Please **do not publish an exploit, sample victim file, private data, or secret** in a public issue.

Open the repository's **Security** tab and use **Report a vulnerability** (GitHub Private Vulnerability Reporting), if available. If private reporting is unavailable, contact the maintainer privately before public disclosure.

## Security model

Soveris Universal Sanitizer is designed to process files locally in the browser. Proposed features must not transmit user-selected files, text, or derived sensitive metadata over a network. No analytics, trackers, third-party scripts, remote fonts, or CDN dependencies are allowed by default.

Expected contribution practice:
- Contributions from unknown authors should arrive via forks and pull requests, not direct pushes to `main`.
- Never run proposed pull-request code with deployment secrets or write-privileged credentials.
- Review changes to workflows, tests, the security policy, and web assets as carefully as application logic.
- Code-owner approval requires an enabled repository ruleset or branch protection; the CODEOWNERS file alone is not an enforcement mechanism.
- Even passing tests and static checks **does not prove code is safe**. Inspect behavior, dependencies, and diffs before merging.
- Keep originals; sanitized output does not certify a file as AI-free, free of embedded watermarks, or authentic.

## Recommended branch rules (repository administrator)

Create a branch ruleset targeting `main`, require pull requests and passing status checks, prevent force pushes and branch deletion, and avoid broad bypass permissions. If reliable independent reviewers are available, require at least one approval and optionally code-owner review. A sole author cannot approve their own pull request, so configure mandatory approvals with care.

## Supported versions

Security fixes target the current `main` branch. This repository is an early experimental release; there is no long-term support commitment yet.
