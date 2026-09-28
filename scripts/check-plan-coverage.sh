#!/usr/bin/env bash
#
# Plan-coverage verifier.
#
# Proves that every test-case ID declared in the plan documents is referenced by
# at least one spec file. Run from the repo root:
#
#   bash scripts/check-plan-coverage.sh
#
# Exit code 0 = full traceability (no case missed); 1 = one or more unmapped cases.

set -euo pipefail

UI_PLAN_RE='(AUTH-(P|N|E|S|SEC)-[0-9]{3}|PRD-(P|N|E|D)-[0-9]{3}|CC-(P|N|E|D|S)-[0-9]{3}|HOME-P-[0-9]{3}|NAV-(P|N)-[0-9]{3}|CAT-(P|N)-[0-9]{3}|LIS-P-[0-9]{3}|PAY-(P|N)-[0-9]{3}|ORD-(P|N)-[0-9]{3}|ACC-(P|E)-[0-9]{3}|SES-(P|N)-[0-9]{3}|UI-P-[0-9]{3}|A11Y-[0-9]{3}|RSP-[0-9]{3}|XB-[0-9]{3}|SEC-[0-9]{3}|ERR-[0-9]{3}|INF-(P|N)-[0-9]{3})'
API_PLAN_RE='(AUTH-(P|N|B|SEC)-[0-9]{3}|CART-(P|N|B|SEC|I|C|D)-[0-9]{3}|PRD-(P|N|B|SEC|D)-[0-9]{3}|CO-(P|N|I|SEC|WF|D)-[0-9]{3}|NEG-[0-9]{3}|EDGE-[0-9]{3}|SEC-[0-9]{3}|ERR-[0-9]{3}|IDEM-[0-9]{3}|CONC-[0-9]{3}|SCH-[0-9]{3}|PAG-[0-9]{3})'

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

grep -oE "$UI_PLAN_RE" TEST-PLAN.md | sort -u > "$tmp/ui_plan.txt"
grep -rhoE "$UI_PLAN_RE" tests --include=*.spec.ts --exclude-dir=api | sort -u > "$tmp/ui_ref.txt"
comm -23 "$tmp/ui_plan.txt" "$tmp/ui_ref.txt" > "$tmp/ui_missing.txt"

grep -rhoE "$API_PLAN_RE" specs/api-authentication.md specs/api-cart.md specs/api-products.md \
  specs/api-checkout-orders.md specs/api-negative-edge.md | sort -u > "$tmp/api_plan.txt"
grep -rhoE "$API_PLAN_RE" tests/api --include=*.spec.ts | sort -u > "$tmp/api_ref.txt"
comm -23 "$tmp/api_plan.txt" "$tmp/api_ref.txt" > "$tmp/api_missing.txt"

echo "UI master-plan cases : $(wc -l < "$tmp/ui_plan.txt")  | unmapped: $(wc -l < "$tmp/ui_missing.txt")"
echo "API spec cases       : $(wc -l < "$tmp/api_plan.txt")  | unmapped: $(wc -l < "$tmp/api_missing.txt")"

if [ -s "$tmp/ui_missing.txt" ] || [ -s "$tmp/api_missing.txt" ]; then
  echo
  echo "UNMAPPED CASES:"
  cat "$tmp/ui_missing.txt" "$tmp/api_missing.txt"
  exit 1
fi

echo
echo "✔ Every planned test case is mapped to code."
