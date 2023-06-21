---
layout: default
title: cf_version_minimum
published: true
---

[%CFEngine_function_prototype(string)%]

**Description:** Returns `true` if local CFEngine version is newer than or equal to specified `string`.

[%CFEngine_function_attributes(string)%]

**Example:**

[%CFEngine_include_snippet(cf_version_minimum.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(cf_version_minimum.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**See also:** `cf_version_maximum()`, `cf_version_after()`, `cf_version_before()`, `cf_version_at()`, `cf_version_between()`.

**History:**

* Introduced in 3.16.0
