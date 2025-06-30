#!/bin/bash

# ===== Parametry z CLI lub krokowo =====
TOOL=$1
MODE=$2
DB=$3
DURATION=$4
RATE=$5

[ -z "$TOOL" ] && read -p "🔧 tool (k6/artillery): " TOOL
[ -z "$MODE" ] && read -p "📘 mode (read/write): " MODE
[ -z "$DB" ] && read -p "🗃️ database (postgres/mongodb/redis/mysql): " DB
[ -z "$DURATION" ] && read -p "⏱️ duration [sec]: " DURATION
[ -z "$RATE" ] && read -p "🚀 arrivalRate/vus (rate): " RATE

ENDPOINT="/benchmark/$DB/$MODE"
METHOD=$( [[ "$MODE" == "read" ]] && echo "GET" || echo "POST" )

echo ""
echo "▶️ Testing in progress:"
echo "   Tool: $TOOL"
echo "   Mode: $MODE"
echo "   Endpoint: $ENDPOINT"
echo "   Duration: ${DURATION}s"
echo "   Intensity: $RATE"
echo ""

# ===== ARTILLERY =====
if [[ "$TOOL" == "artillery" ]]; then
  TEMPLATE="benchmarks/artillery/template.yml"
  TEMPFILE=$(mktemp --suffix=".yml")

  sed "s|{{endpoint}}|$ENDPOINT|g;
       s|{{method}}|${METHOD,,}|g;
       s|{{duration}}|$DURATION|g;
       s|{{arrivalRate}}|$RATE|g" $TEMPLATE > "$TEMPFILE"

  OUTFILE="benchmarks/${TOOL}_${DB}_${MODE}_${DURATION}s_${RATE}.json"
  artillery run --output "$OUTFILE" "$TEMPFILE"
  rm -f "$TEMPFILE"

# ===== K6 =====
elif [[ "$TOOL" == "k6" ]]; then
  VUS=$RATE
  k6 run -e VUS=$VUS \
         -e DURATION="${DURATION}s" \
         -e ENDPOINT="$ENDPOINT" \
         -e METHOD=$METHOD \
         benchmarks/k6/test.js

else
  echo "Wrong parameters"
fi
