#!/usr/bin/env bash
node set-generator.js name | pbcopy
node phrase-generator.js wikitext/file uuid | pbcopy
