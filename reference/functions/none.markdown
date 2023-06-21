---
layout: default
title: none
published: true
---

[%CFEngine_function_prototype(regex, list)%]

**Description:** Returns whether no element in `list` matches the regular
expression `regex`.

[This function can accept many types of data parameters.][Functions#collecting functions]

[%CFEngine_function_attributes(regex, list)%]

The regular expression is [unanchored][unanchored].

**Example:**

[%CFEngine_include_snippet(none.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(none.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** [About collecting functions][Functions#collecting functions], `filter()`, `every()`, and `some()`.
