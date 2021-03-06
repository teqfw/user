#!/usr/bin/env bash
##
# Clean development files from release branch
##
DIR_ROOT=${DIR_ROOT:-$(cd "$(dirname "$0")/../../" && pwd)}

rm -fr "${DIR_ROOT:?}/bin/deploy/"
rm -fr "${DIR_ROOT:?}/dev/"
rm -fr "${DIR_ROOT:?}/doc/"
rm -fr "${DIR_ROOT:?}/node_modules/"
rm -fr "${DIR_ROOT:?}/own_modules/"
rm -fr "${DIR_ROOT:?}/package-lock.json"
rm -fr "${DIR_ROOT:?}/test/"
rm -fr "${DIR_ROOT:?}/tmp/"
