---
layout: default
title: mean
published: true
---

[%CFEngine_function_prototype(list)%]

**Description:** Return the mean of the numbers in `list`.

[This function can accept many types of data parameters.][Functions#collecting functions]

[%CFEngine_function_attributes(list)%]

**Example:**

[%CFEngine_include_snippet(max-min-mean-variance.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(max-min-mean-variance.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** Was introduced in version 3.6.0 (2014). The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** `sort()`, `variance()`, `sum()`, `max()`, `min()`, [about collecting functions][Functions#collecting functions], and `data` documentation.
