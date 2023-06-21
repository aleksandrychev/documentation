---
layout: default
title: Copy single files
published: true
reviewed: 2013-06-08
reviewed-by: atsaloli
---

This is a standalone policy example that will copy single files,
locally (`local_cp`) and from a remote site (`secure_cp`).
The CFEngine Standard Library (cfengine_stdlib.cf) should be
included in the `/var/cfengine/inputs/libraries/` directory and
inputs list as below.

[%CFEngine_include_example(copy_copbl.cf)%]
