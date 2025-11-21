#!/bin/bash

# Script de prueba rápida del sistema de Newsletter
# Asegúrate de que Strapi esté corriendo en http://localhost:1337

echo "🧪 Test Rápido del Sistema de Newsletter"
echo "=========================================="
echo ""

# Configuración
BASE_URL="http://localhost:1337"
TEST_EMAIL="test-$(date +%s)@ejemplo.com"
echo "📧 Email de prueba: $TEST_EMAIL"
echo ""

# Test 1: Suscripción
echo "📝 Test 1: Suscribir nuevo email..."
RESPONSE=$(curl -s -X POST "$BASE_URL/api/newsletter/subscribe" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$TEST_EMAIL\", \"nombre\": \"Test User\"}")

echo "Respuesta: $RESPONSE"
echo ""

# Verificar si fue exitoso
if echo "$RESPONSE" | grep -q "success.*true"; then
    echo "✅ Suscripción exitosa"
else
    echo "❌ Error en suscripción"
    exit 1
fi

echo ""
echo "⚠️  Para completar la prueba:"
echo "1. Revisa el email en: nuriavazblog@gmail.com (TEST_EMAIL)"
echo "2. O busca en los logs del servidor la URL de confirmación"
echo "3. Copia el token de confirmación"
echo "4. Ejecuta:"
echo "   curl -X POST $BASE_URL/api/newsletter/confirm \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"token\": \"TU_TOKEN_AQUI\", \"email\": \"$TEST_EMAIL\"}'"
echo ""
echo "✅ Test básico completado. Verifica los logs del servidor."
