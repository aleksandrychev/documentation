---
layout: default
title: join
published: true
---

[%CFEngine_function_prototype(glue, list)%]

**Description:** Join the items of `list` into a string, using the conjunction in `glue`.

Converts a list or data container into a scalar variable using the
join string in first argument.

[This function can accept many types of data parameters.][Functions#collecting functions]

[%CFEngine_function_attributes(glue, list)%]

**Example:**

[%CFEngine_include_snippet(join.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(join.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** `string_split()`, [about collecting functions][Functions#collecting functions].
