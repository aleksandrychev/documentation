---
layout: default
title: Personal access tokens API
---

The Personal access tokens API enables you to list, generate and revoke personal access tokens of the
current user. Personal access tokens authenticate scripts and automations as your user. See
[API authentication][API authentication#Personal access tokens] for how tokens behave.

These endpoints cannot be called with a personal access token. Authenticate with a username and password,
or use **Settings -> Personal access tokens** in Mission Portal.

## List personal access tokens

Lists the personal access tokens of the current user, newest first. Expired tokens are included for
at least 30 days after they expire. The token value itself is never returned.

**URI:** https://hub.cfengine.com/api/me/personal-access-tokens

**Method:** GET

**Example request (curl):**

```console
curl --user <username>:<password> \
  -X GET \
  https://hub.cfengine.com/api/me/personal-access-tokens
```

**Successful response example:**

```
HTTP 200 OK
[
    {
        "id": 1,
        "name": "Nightly inventory export",
        "description": "Used by the reporting cron job on build01",
        "token_hint": "cfe_pat_ac19...81a5",
        "scope": "read",
        "created_at": "2026-11-19 09:08:24.482911+00",
        "expires_at": "2026-12-19 09:08:24.482911+00",
        "last_used_at": "2026-11-20 02:00:03.482911+00"
    }
]
```

**Output:**

- **id**
  Token ID, used to revoke the token.
- **name**
  Token name.
- **description**
  Token description, or `null`.
- **token_hint**
  Masked token: the `cfe_pat_` prefix followed by the first and last 4 characters of the secret, to help
  recognize it.
- **scope**
  `read` if the token can only call operations that read data, `write` if it can call all operations
  its user is allowed to.
- **created_at**
  Time when the token was generated.
- **expires_at**
  Time when the token expires.
- **last_used_at**
  Time when the token last authenticated a request, or `null` if it was never used. Updated at most once
  per minute.

**Responses:**

| HTTP response code        | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| 200 OK                    | Tokens successfully returned                                  |
| 401 Unauthorized          | Authentication failed                                         |
| 403 Forbidden             | Request uses a personal access token or permission is missing |
| 500 Internal server error | Internal server error                                         |

## Generate personal access token

Generates a new personal access token for the current user. The token is returned only in this response.
Store it securely; it cannot be retrieved again.

If two-factor authentication is enabled for the user, the request must include a current code in the
`Cf-2fa-Token` header.

**URI:** https://hub.cfengine.com/api/me/personal-access-tokens

**Method:** POST

**Parameters:**

The request body must be a JSON object. Send `{}` to use all defaults. Unknown fields are rejected.

- **name** _(string)_
  Token name. Optional, maximum 100 characters. Defaults to `Access token`.
- **description** _(string)_
  Token description. Optional, maximum 500 characters.
- **scope** _(string)_
  `read` or `write`. Optional, defaults to `read`. A `read` token can only call operations that read
  data; see [API authentication][API authentication#Personal access tokens].
- **expires_in_days** _(integer)_
  Number of days until the token expires, from 1 to 365. Optional, defaults to 30.

**Example request (curl):**

```console
curl --user <username>:<password> \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Cf-2fa-Token: 123456" \
  -d '{"name": "Nightly inventory export", "description": "Used by the reporting cron job on build01", "scope": "read", "expires_in_days": 90}' \
  https://hub.cfengine.com/api/me/personal-access-tokens
```

**Successful response example:**

```
HTTP 201 Created
{
    "id": 2,
    "name": "Nightly inventory export",
    "description": "Used by the reporting cron job on build01",
    "token_hint": "cfe_pat_ac19...81a5",
    "scope": "read",
    "created_at": "2026-11-19 09:08:24.482911+00",
    "expires_at": "2027-02-17 09:08:24.482911+00",
    "last_used_at": null,
    "token": "cfe_pat_ac19e6e8bef165390e70e476ae2f989c7b5c81a5"
}
```

**Output:**

The same fields as in [List personal access tokens](#list-personal-access-tokens), plus:

- **token**
  The personal access token. Send it as `Authorization: Bearer <token>`.

**Responses:**

| HTTP response code        | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| 201 Created               | Token successfully generated                                       |
| 400 Bad Request           | Request body is not a JSON object                                  |
| 401 Unauthorized          | Authentication failed or the two-factor code is missing or invalid |
| 403 Forbidden             | Request uses a personal access token or permission is missing      |
| 422 Unprocessable entity  | Invalid or unknown parameters                                      |
| 500 Internal server error | Internal server error                                              |

## Revoke personal access token

Revokes a personal access token of the current user. Requests using the token fail immediately.

**URI:** https://hub.cfengine.com/api/me/personal-access-tokens/:id

**Method:** DELETE

**Parameters:**

- **id** _(integer)_
  Token ID. Required.

**Example request (curl):**

```console
curl --user <username>:<password> \
  -X DELETE \
  https://hub.cfengine.com/api/me/personal-access-tokens/2
```

**Successful response example:**

```
HTTP 204 No Content
```

**Responses:**

| HTTP response code        | Description                                                   |
| ------------------------- | ------------------------------------------------------------- |
| 204 No Content            | Token successfully revoked                                    |
| 401 Unauthorized          | Authentication failed                                         |
| 403 Forbidden             | Request uses a personal access token or permission is missing |
| 404 Not Found             | Token not found                                               |
| 500 Internal server error | Internal server error                                         |

## Using a personal access token

Send the token in the `Authorization` header of any other API request:

```console
curl -H "Authorization: Bearer cfe_pat_ac19e6e8bef165390e70e476ae2f989c7b5c81a5" \
  https://hub.cfengine.com/api/host
```

An invalid, expired or revoked token results in `401 Unauthorized`.
