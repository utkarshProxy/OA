#!/usr/bin/env bash
# Local preview with the production security headers applied, so you are
# testing the same CSP the live site will enforce. No dependencies beyond
# python3, which ships with macOS.
#
#   ./serve.sh          -> http://127.0.0.1:8000
#   ./serve.sh 4321     -> http://127.0.0.1:4321
set -euo pipefail
cd "$(dirname "$0")"
exec python3 tools/dev-server.py "${1:-8000}"
