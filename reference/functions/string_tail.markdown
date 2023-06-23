---
layout: default
title: string_tail
published: true
---

[%CFEngine_function_prototype(data, max)%]

**Description:** Returns the last `max` bytes of `data`.

If `max` is negative, then everything but the first `max` bytes is returned.

[%CFEngine_function_attributes(data, max)%]

**Example:**

[%CFEngine_include_snippet(string_tail.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(string_tail.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** Introduced in CFEngine 3.6

**See also:** `string_head()`, `string_length()`, `string_reverse()`.
