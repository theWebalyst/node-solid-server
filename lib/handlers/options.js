const addLink = require('../header').addLink
const utils = require('../utils')

module.exports = handler

function handler (req, res, next) {
  linkServiceEndpoint(req, res)
  linkAuthProvider(req, res)
  linkSparqlEndpoint(res)

  res.status(204)

  next()
}

function linkAuthProvider (req, res) {
  let locals = req.app.locals
  if (locals.authMethod === 'oidc') {
    let oidcProviderUri = locals.host.serverUri
    addLink(res, oidcProviderUri, 'http://openid.net/specs/connect/1.0/issuer')
  }
}

function linkServiceEndpoint (req, res) {
  let serviceEndpoint = `${utils.getFullUri(req)}/.well-known/solid`
  addLink(res, serviceEndpoint, 'service')
}

function linkSparqlEndpoint (res) {
  res.header('Accept-Patch', 'application/sparql-update')
}
