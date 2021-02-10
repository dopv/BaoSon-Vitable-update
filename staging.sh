#! /usr/bin/env bash
set -e # exit entire script when command exits with non-zero status
# Install dependencies
npm install
Publish `production` release
expo publish --release-channel production --non-interactive --config app.staging.json
# Start building standalone android build using `production` release channel
expo build:android --release-channel production --non-interactive --no-publish --config app.staging.json
# Download the built android binary
curl -o app.apk "$(expo url:apk --non-interactive --config app.staging.json)"
# Use fastlane to upload your current standalone android build
# Customize this to fit your needs. Take note of env variables.
# Check out https://docs.fastlane.tools for more info.
fastlane supply --track 'internal' --json_key 'pc-api-6340287639283478838-971-fd87131f2b71.json' --package_name "com.vitable.staging" --apk "app.apk" --skip_upload_metadata --skip_upload_images --skip_upload_screenshots
# Start building standalone android build using `production` release channel
expo build:ios --release-channel production --non-interactive --no-publish --config app.staging.json
# Download the artifact to current directory as `app.ipa`
curl -o app.ipa "$(expo url:ipa --non-interactive --config app.staging.json)"
# export $DELIVER_USERNAME='<user'
# export $DELIVER_PASSWORD='<pass>'
# Use fastlane to upload your current standalone iOS build to test flight on iTunes Connect.
fastlane deliver --verbose --ipa "app.ipa" --skip_screenshots --skip_metadata
