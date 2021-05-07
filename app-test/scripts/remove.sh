#! /bin/sh

BUILD_NUMBER=0

echo 'Removing Cypress Test container...'

docker rm cypress_test_container_${BUILD_NUMBER}

echo 'Removed Cypress Test container'
