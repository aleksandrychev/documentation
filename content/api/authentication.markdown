---
layout: default
title: API authentication
sorting: 5
---

Every request to the CFEngine Enterprise API must be authenticated. The API supports two methods:

- **Basic authentication** with a username and password.
- **Bearer tokens**, such as personal access tokens generated in Mission Portal.

For scripts and automations, use [personal access tokens](#personal-access-tokens). They avoid storing
your password in scripts, can be revoked individually and work for accounts with two-factor
authentication enabled.

## Basic authentication

Send your username and password with each request:

```console
curl --user <username>:<password> \
  https://hub.cfengine.com/api/
```

Users are looked up in the internal users table first, then in the external source (OpenLDAP or
Active Directory) configured through [/api/settings][Status and settings REST API#Update settings].

If two-factor authentication is enabled for the user, every request authenticated with a username and
password must also include a current code in the `Cf-2fa-Token` header. See the
[Two-factor authentication API][Two-factor authentication API] for details.

Repeated failed attempts are rate limited. The API responds with `429 Too Many Requests` and the number
of seconds to wait before the next attempt.

## Personal access tokens

A personal access token is a long-lived secret that authenticates API requests as your user. Send it in
the `Authorization` header:

```console
curl -H "Authorization: Bearer cfe_pat_<token>" \
  https://hub.cfengine.com/api/
```

### Generate a token

In Mission Portal, open **Settings -> Personal access tokens** and click **Generate new token**. Give the
token a name and a description so you can recognize it later, choose its access, then choose when it
expires.

Tokens can also be managed with the [Personal access tokens API][Personal access tokens API].

The token is shown only once, right after it is generated. Copy it and store it in a secure place, such
as a secrets manager. The hub stores only a hash of the token, so a lost token cannot be recovered; revoke
it and generate a new one.

### How tokens behave

- **Permissions:** A token acts as your user and can never do more than your RBAC permissions allow.
  Changes to your roles apply to your tokens immediately. For LDAP or Active Directory users, role
  changes made in the directory apply after the user's next login to Mission Portal.
- **Access:** A token is either **Read only** (`read`, the default) or **Read and write** (`write`). A
  read only token can call only operations that read data: `GET` requests, and requests sent as `POST`
  that only read, such as SQL queries, inventory reports, host search and health reports. A read only
  token can also cancel its own asynchronous query. Other requests are rejected with `403 Forbidden`.
  The access of a token cannot be changed after it is generated.
- **Two-factor authentication:** Requests authenticated with a token do not require a two-factor
  authentication code. If two-factor authentication is enabled for your account, you may be asked for a
  code when generating a token. If two-factor authentication is enforced and you have not configured it
  in time, requests with your tokens are rejected with `403 Forbidden`.
- **Expiration:** A token expires after 30 days by default. You can choose any expiration between 1 day
  and 1 year. Expired tokens remain listed for at least 30 days after they expire.
- **Revocation:** You can revoke a token at any time. All your tokens are revoked when your password
  changes, including a password reset, and when your user is deleted. Tokens of LDAP or Active Directory
  users are revoked when an administrator saves the authentication settings with **Log out all LDAP
  users** selected. Disabling a user or changing their password in the directory does not revoke their
  tokens.
- **Restricted actions:** A token cannot create or replace users, change passwords or email addresses
  (yours or other users'), unlock users, configure, verify or disable two-factor authentication, list or
  revoke other access tokens (`/api/oauth2/token`), log out all LDAP users, or list, generate and revoke
  personal access tokens. These actions require a password or a Mission Portal session.
- **Audit:** Generating and revoking tokens is recorded in the audit log.

Treat a personal access token like a password. Anyone who has it can call the API as you until the
token expires or is revoked.

## Two-factor authentication

Two-factor authentication adds a time-based one-time password (TOTP) on top of your password. See the
[Two-factor authentication API][Two-factor authentication API] for how to configure it and which
requests require the `Cf-2fa-Token` header.

## Authorization

Authentication identifies the user. What the user can do is controlled by role based access control
(RBAC). See [Users and access-control REST API][Users and access-control REST API] for managing roles and
permissions.
