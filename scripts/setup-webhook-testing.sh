#!/bin/bash

# Quick Webhook Testing Setup Script
# This script helps you set up ngrok for local webhook testing

echo "🍋 Lemon Squeezy Webhook Testing Setup"
echo "======================================"
echo ""

# Check if ngrok is installed
if ! command -v ngrok &> /dev/null
then
    echo "❌ ngrok is not installed"
    echo ""
    echo "Install ngrok:"
    echo "  macOS: brew install ngrok"
    echo "  Or download from: https://ngrok.com/download"
    echo ""
    exit 1
fi

echo "✅ ngrok is installed"
echo ""

# Check if Next.js is running
if ! lsof -i:3000 &> /dev/null
then
    echo "⚠️  Next.js is not running on port 3000"
    echo ""
    echo "Please start your Next.js app first:"
    echo "  npm run dev"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Next.js is running on port 3000"
echo ""

# Start ngrok
echo "🚀 Starting ngrok tunnel..."
echo ""
echo "Your webhook URL will be shown below."
echo "Copy the HTTPS URL and use it in Lemon Squeezy webhook settings."
echo ""
echo "Format: https://YOUR-NGROK-URL/api/lemonsqueezy/webhook"
echo ""
echo "Press Ctrl+C to stop ngrok when done testing."
echo ""

ngrok http 3000
