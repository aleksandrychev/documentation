---
layout: default
title: maparray
published: true
---

[%CFEngine_function_prototype(pattern, array_or_container)%]

**Description:** Returns a list with each `array_or_container` element
modified by a `pattern`.

[This function can accept many types of data parameters.][Functions#collecting functions]

[This function can delay the evaluation of its first parameter, which can therefore be a function call.][Functions#delayed evaluation functions]

The `$(this.k)` and `$(this.v)` variables expand to the key and value
of the current element, similar to the way `this` is available for
`maplist`.

If the array has two levels, you'll also be able to use the
`$(this.k[1])` variable for the key at the second level. See the
example below for an illustration.

If a value in the array is an `slist`, you'll get one result for each
value (implicit looping).

The order of the array keys is not guaranteed.  Use the `sort`
function if you need order in the resulting output.

[%CFEngine_function_attributes(pattern, array_or_container)%]

**Example:**

[%CFEngine_include_snippet(maparray.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(maparray.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** The [collecting function][Functions#collecting functions] behavior was added in 3.9. The delayed evaluation behavior was introduced in 3.10.

**See also:** `maplist()`, `mapdata()`, [about collecting functions][Functions#collecting functions], and `data` documentation.
