---
layout: default
title: intersection
published: true
---

[%CFEngine_function_prototype(list1, list2)%]

**Description:** Returns the unique elements in list1 that are also in list2.

[This function can accept many types of data parameters.][Functions#collecting functions]

[%CFEngine_function_attributes(list1, list2)%]

**Example:**

[%CFEngine_include_snippet(intersection.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(intersection.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**See also:** [About collecting functions][Functions#collecting functions], `difference()`.
