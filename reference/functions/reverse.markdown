---
layout: default
title: reverse
published: true
---

[%CFEngine_function_prototype(list)%]

**Description:** Reverses a list.

This is a simple function to reverse a list.

[This function can accept many types of data parameters.][Functions#collecting functions]

**Arguments**:

* list : The name of the list variable to check, in the range
`[a-zA-Z0-9_$(){}\[\].:]+`

**Example:**


[%CFEngine_include_snippet(reverse.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(reverse.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** `filter()`, `grep()`, `every()`, `some()`, `none()`, [about collecting functions][Functions#collecting functions], and `data` documentation.
