---
layout: default
title: difference
published: true
---

[%CFEngine_function_prototype(list1, list2)%]

**Description:** Returns the unique elements in `list1` that are not in
`list2`.

[This function can accept many types of data parameters.][Functions#collecting functions]

[%CFEngine_function_attributes(list1, list2)%]

**Example:**

[%CFEngine_include_snippet(difference.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(difference.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** [About collecting functions][Functions#collecting functions], `intersection()`.
