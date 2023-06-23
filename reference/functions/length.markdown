---
layout: default
title: length
published: true
---

[%CFEngine_function_prototype(list)%]

**Description:** Returns the length of `list`.

[This function can accept many types of data parameters.][Functions#collecting functions]

[%CFEngine_function_attributes(list)%]

**Example:**

[%CFEngine_include_snippet(length.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(length.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** `nth()`, `mergedata()`, [about collecting functions][Functions#collecting functions], and `data` documentation.
