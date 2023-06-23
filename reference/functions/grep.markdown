---
layout: default
title: grep
published: true
---

[%CFEngine_function_prototype(regex, list)%]

**Description:** Returns the sub-list if items  in `list` matching the
[anchored][anchored] regular expression `regex`.

[This function can accept many types of data parameters.][Functions#collecting functions]

[%CFEngine_function_attributes(regex, list)%]

**Example:**

[%CFEngine_include_snippet(grep.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(grep.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** [About collecting functions][Functions#collecting functions], `filter()`, `every()`, `some()`, and `none()`.
